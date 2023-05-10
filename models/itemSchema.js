const mongoose=require('mongoose');
const itemSchema=mongoose.Schema;

const itemsSchema = new itemSchema({
    pname: { type: String},
  source: { type: String },
  destination: { type: String},
  remark: { type: String},
  manufacturer:{type:String}
});

module.exports=mongoose.model('items',itemsSchema);

