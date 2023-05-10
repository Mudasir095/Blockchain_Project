const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const homeRouter=require('./router/homeRouter')
const session = require('express-session');

// const session=require('./router/homeRouter')


mongoose.connect("mongodb://127.0.0.1:27017/blockchain",{useNewUrlParser:true});
const db=mongoose.connection;

db.on("error",()=>{console.log("Error");})
db.once("open",()=>{console.log("Connected");})




const app=express()

app.use(bodyParser.json());
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false
  }));
  
// app.use(session());
app.use(session());
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(express.static('js'))
app.use('/',homeRouter)
// app.get('/',(req,res)=>{
//     res.send("Hiee")
// })
app.listen(8080)