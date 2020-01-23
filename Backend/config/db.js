var mongoose = require("mongoose");
var MD5 = require("md5");
// var nodeMailer = require("nodemailer");

var collectionSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "You Can't Make a  User Name Empty"]
  },
  email: {
    type: String,
    required: [true, "You Can't Make The Email Empty"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "You Can't Make A Password Empty"]
    // minlength: [8, "The Password Should Be 8 Charchters"],
    // maxlength: [8, "The Password Should Be 8 Charchters"]
  },
  // businessIMG:{ type: String,default:"/img.png", required: false },
  businesses: {
    type: [
      {
        items: [
          {
            name: {
              type: String,
              required: [true, "You Can't Make Item Name Empty"]
            },
            price: {
              type: Number,
              required: [true, "You Can't Make Item Price Empty"]
            },
            itemIMG: {
              type: String,
              required: [false],
              default: "Images/Default Image/defaultoffer.png"
            },
            description: {
              type: String,
              required: [false]
            }
          }
        ],
        busIMG: {
          type: String,
          required: false,
          default: "Images/Default Image/default.png"
        },
        latitude: {
          type: String,
          required: [true, "You Can't Make a Latitude Empty"]
        },
        longitude: {
          type: String,
          required: [true, "You Can't Make a Longitude Empty"]
        },
        title: {
          type: String,
          required: [true, "You Can't Make a Title Empty"]
        },
        type: {
          type: String,
          required: [true, "You Can't Make a Type Empty"]
        }
      }
    ],
    required: false
  }
});
//useNewUrlParses=>
//useUnifiedTopology=>
mongoose.connect(
  "mongodb://localhost/tashishneDB",
  // "mongodb+srv://mohammad:mohammad123456789@cluster0-0neqf.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (error) => {
    if (!error) console.log("You Are Connected To DB");
  }
);

// userSchema= mongoose.Schema({name:{type:String , unique:true}})

var user = mongoose.model("users", collectionSchema);

addUser = (data, callback) => {
  if (data.password !== null && data.password !== "") {
    data.password = MD5(data.password);
    user.create(data, (error, res) => {
      if (error) {
        if (error.code == "11000") {
          callback("Another One Has Same Email");
        } else {
          callback(error.message);
        }
      } else {
        callback(res);
      }
    });
  } else {
    console.log("ERROR");
    callback("You Can't Make A Password Empty");
  }
};

login = (data, callback) => {
  data.password = MD5(data.password);
  console.log(data.password);
  user.findOne(data, { _id: 1 }, (error, res) => {
    if (error) {
      callback(error);
    } else {
      callback(res);
    }
  });
};

getBusinesses = (data, callback) => {
  user.findOne(data, { _id: 0, businesses: 1 }, (error, res) => {
    if (error) {
      callback(error);
    } else {
      callback(res);
    }
  });
};

addBusiness = (id, data, callback) => {
  user.updateOne({ _id: id }, { $push: { businesses: data } }, (error, res) => {
    if (error) {
      callback(error);
    } else {
      callback(res);
    }
  });
};

removeBusiness = (userInfo, callback) => {
  console.log(userInfo.userID, userInfo.bussID);
  const { userID, bussID } = userInfo;

  user.update(
    { _id: userID },
    { $pull: { businesses: { _id: bussID } } },
    (error, res) => {
      if (error) {
        callback(error);
      } else {
        callback(res);
      }
    }
  );

  // user.updateMany(
  //   { _id: userID, "businesses.busName": busName },
  //   {
  //     $set: {
  //       "businesses.$.busName": busInfo.busName,
  //       "businesses.$.title": busInfo.title,
  //       "businesses.$.latitude": busInfo.latitude,
  //       "businesses.$.longitude": busInfo.longitude,
  //       "businesses.$.busIMG": busInfo.busIMG
  //     }
  //   },
  //   (error, res) => {
  //     if (error) {
  //       callback(error);
  //     } else {
  //       callback(res);
  //     }
  //   }
  // );
};

editBusiness = (bussInfo, newDate, callback) => {
  const { userID, bussID } = bussInfo;
  user.updateOne(
    { _id: userID, "businesses._id": bussID },
    {
      "businesses.$.busIMG": newDate.busIMG,
      "businesses.$.longitude": newDate.longitude,
      "businesses.$.latitude": newDate.latitude,
      "businesses.$.title": newDate.title,
      "businesses.$.busName": newDate.busName
    },
    (error, res) => {
      if (error) {
        callback(error);
      } else {
        callback(res);
      }
    }
  );
};

// getOffers = (userID, callback) => {
//   user.findOne({_id:})

// };

addOffer = (ID, offer, callback) => {
  console.log(ID);
  user.updateOne(
    {
      //    userID: localStorage.getItem("userID"),
      //    bussinessID: this.props.render.location.state
      _id: ID.userID,
      "businesses._id": ID.bussinessID
    },
    {
      $push: {
        "businesses.$.items": {
          name: offer.name,
          price: offer.price,
          itemIMG: offer.itemIMG,
          description: offer.description
        }
        // "businesses.$.items": offer
      }
    },
    (error, res) => {
      if (error) {
        callback(error);
      } else {
        callback(res);
      }
    }
  );
};

getOffer = (userID, bussID, callback) => {
  console.log(userID, bussID);

  user.find(
    {
      _id: userID,
      businesses: {
        $elemMatch: { _id: bussID }
      }
    },
    { "businesses.$": 1 },
    (error, response) => {
      callback(response);
    }
  );

  // user.findOne(
  //   { _id: userID, "businesses._id": bussID },
  //   // { businesses: 1, _id: 0 },
  //   (error, res) => {
  //     callback(res);
  //   }
  // );
};

removeOffer = (userID, itemID, bussID, callback) => {
  user.updateOne(
    { _id: userID, "businesses._id": bussID },
    {
      $pull: {
        "businesses.$[].items": { _id: itemID }
      }
    },
    (error, response) => {
      callback(response);
    }
  );
};
//,"items._id": "5e06833951cade264913843c"
editOffer = (userID, itemID, bussID, info, callback) => {
  console.log("UserID", userID, "BusID", bussID, "ItemID", itemID);
  user.updateOne(
    {
      _id: userID,
      "businesses._id": bussID,
      "businesses.items._id": itemID
      //   _id: userID,
      //   businesses: { $elemMatch: { _id: bussID, "items._id": itemID } }
    },
    {
      $set: {
        "businesses.$[outer].items.$[inner].name": info.name,
        "businesses.$[outer].items.$[inner].price": info.price,
        "businesses.$[outer].items.$[inner].description": info.description,
        "businesses.$[outer].items.$[inner].itemIMG": info.itemIMG
      }
    },

    {
      arrayFilters: [{ "outer._id": bussID }, { "inner._id": itemID }]
    },
    (error, response) => {
      callback(response);
    }
  );
};

// forgetPassword = (data, callback) => {
//   user.findOne(data, (error, res) => {
//     if (error) {
//       callback(error);
//     } else {
//       // console.log(res.email , res.password);
//       sendMail(res.email , res.password);
//       callback(res);
//     }
//   });
// };

// let sendMail= async (email , password)=>{

// let transport = await nodeMailer.createTransport({

//   host:'smtp.gmail.com',
//   service: 'Gmail',
//   port:465,
//   secure:false,
//   auth:{
//     type: 'OAuth2',
//     user:'mohamedmh1995@gmail.com',
//     pass:'5284219070m7md'

//   }
// })

// let mailOptions={
// to:"mohamed_mh1995@yahoo.com",
// subject:"Retrive You Password",
// body:"You Password IS : "
// }

// transport.sendMail(mailOptions , (error , info)=>{

//   if(error)
//   console.log(error);

//   console.log("info");

// })

// }
// ---------------------------------------------------Mobile APP----------------------
getTripByEntertainment = (budget, callback) => {
  user.aggregate(
    [
      { $unwind: "$businesses" },
      { $unwind: "$businesses.items" },
      { $match: { "businesses.items.price": { $lte: budget } } },
      { $match: { "businesses.type": "Entertainment" } },

      {
        $group: {
          _id: {
            id: "$businesses._id",
            title: "$businesses.title",
            type: "$businesses.type",
            longitude: "$businesses.longitude",
            latitude: "$businesses.latitude",
            busIMG: "$businesses.busIMG"
          },
          businesses: { $push: "$businesses.items" }
        }
      }
    ],
    (error, response) => {
      console.log(response);
      callback(response);
    }
  );
};

getTripByRestaurant = (budget, callback) => {
  console.log("Trips");

  user.aggregate(
    [
      { $unwind: "$businesses" },
      { $unwind: "$businesses.items" },
      { $match: { "businesses.items.price": { $lte: budget } } },
      { $match: { "businesses.type": "Restaurants" } },

      {
        $group: {
          _id: {
            id: "$businesses._id",
            title: "$businesses.title",
            type: "$businesses.type",
            longitude: "$businesses.longitude",
            latitude: "$businesses.latitude",
            busIMG: "$businesses.busIMG"
          },
          businesses: { $push: "$businesses.items" }
        }
      }
    ],
    (error, response) => {
      console.log(response);
      callback(response);
    }
  );
};

buildYourTrip = (callback) => {
  user.find({}, { _id: 0, businesses: 1 }, (error, response) => {
    if (!error) callback(response);
  });
};
// ---------------------------------------------------Mobile APP----------------------

module.exports = {
  login,
  addUser,
  getBusinesses,
  addBusiness,
  removeBusiness,
  editBusiness,
  addOffer,
  getOffer,
  removeOffer,
  editOffer,
  getTripByEntertainment,
  getTripByRestaurant,
  buildYourTrip
};
