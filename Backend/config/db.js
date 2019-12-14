var mongoose = require("mongoose");
var collectionSchema = mongoose.Schema({
  userName: { type: String, required: [true, "You Can't Make userName Empty"] },
  email: { type: String, required: [true, "You Can't Make The Email Empty"] },
  password: {
    type: String,
    required: [true, "You Can't Make A Password Empty"],
    minlength: [8, "The Password Should Be At Least 8 Charchters"],
    maxlength: [8, "The Password Should Be At Least 8 Charchters"]
  },
  businesses: { type: Array, required: false }
});
//useNewUrlParses=>
//useUnifiedTopology=>
mongoose.connect(
  // "mongodb://localhost/tashishneDB",
  "mongodb+srv://mohammad:mohammad123456789@cluster0-0neqf.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (error) => {
    if (!error) console.log("You Are Connected To Atlas");
  }
);

// userSchema= mongoose.Schema({name:{type:String , unique:true}})

var user = mongoose.model("users", collectionSchema);

findUser = (callback) => {
  user.insertMany({ name: "Mohammad" }, (err, res) => {
    if (!err) callback(res);
  });
};

addUser = (data, callback) => {
  user.insertMany(data, (error, res) => {
    if (!error) {
      callback(res);
    } else {
      callback(error);
    }
  });
};

module.exports = { findUser, addUser };
