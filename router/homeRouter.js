const express = require('express')
const bodyParser = require('body-parser')
const Router = express.Router()
const userSchema = require('../models/userSchema')
const itemsSchema = require("../models/itemSchema")
const session = require('express-session')
// const upload = multer();

Router.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

let isAuthenticated = false

Router.get('/', (req, res) => {
  res.render('index')
})


Router.get('/logout', (req, res) => {
  isAuthenticated = false
  req.session.destroy()
  res.render('index')
})

Router.get('/home_page', (req, res) => {
  if (isAuthenticated) {
    console.log(req.session.username);
    var name=req.session.username;
    res.render('home_page',{name})
  } else {
    res.redirect('/')
  }
})

Router.get('/Update', (req, res) => {
    if(isAuthenticated)
    {
        res.render('Update');
    }
    else
    {
        res.redirect('/');
    }
  
})

Router.get('/Add_product', (req, res) => {
  if(isAuthenticated)
  {
    var name=req.session.username;
    res.render('Add_product',{name});
  }
  else
  {
    res.redirect('/');
  }
 
})

Router.get('/displaytranscations', (req, res) => {
    if(isAuthenticated)
    {
      var name=req.session.username;
      itemsSchema.find({manufacturer:name}).then((x)=>{
        res.render('displaytranscations',{x,name})
        console.log(x);
      })
       
    }
    else{
        res.redirect('/')
    }
})

Router.post('/index', async (req, res) => {
  try {
    const {
      email,
      fullName,
      username,
      password
    } = req.body
    const newUser = new userSchema({
      email,
      fullName,
      username,
      password
    })
    await newUser.save()
    res.render('index')
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

Router.post('/login', (req, res) => {
  const {
    username,
    password
  } = req.body
  userSchema.findOne({
      username: username
    })
    .then((result) => {
      if (result && result.password === password) {
        isAuthenticated = true;
        req.session.username = username;
        req.session.isLoggedIn = isAuthenticated
        
        res.redirect('/home_page')
      } else {
        res.status(404).send('Login Failed')
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Internal Server Error')
    })
})

Router.post('/items', async (req, res) => {
  try {
    const { pname, source, destination, remark } = req.body;
    console.log(pname);
    console.log(source);
    var manufacturer=req.session.username;
    const items = new itemsSchema({ pname, source, destination, remark,manufacturer});
    
    await items.save();
    res.status(200).json({ message: 'Data stored in MongoDB successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// const Item = mongoose.model('Item', itemSchema);
// const Item = new itemsSchema();

// Define API route to get all items
// Router.get('/displaytranscations', async (req, res) => {
//   try {
//     const items = await Item.find();
//     console.log(items)
//     res.json(items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = Router
