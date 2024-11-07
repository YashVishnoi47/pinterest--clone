const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pin-app");

const userSchema = mongoose.Schema({
  username:String,
  password:String,
  email:String,
  profileimage:String,
  posts:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"post"
    }
  ]
});



userSchema.plugin(plm);


module.exports = mongoose.model("user",userSchema);

