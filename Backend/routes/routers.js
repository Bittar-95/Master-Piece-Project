var express = require("express");
var db = require("../config/db");
// var multer = require("multer");
//uninstall multer
var path = require("path");
var app = express();

//routers handler methodes
// app.get('/' , (req,res)=>{res.send("Ali")})
app.get("/");

//upload.single("bussIMG")

var fileupload = require("express-fileupload");

app.use(fileupload());

app.post("/uploadbussimage", (req, res) => {
  if (req.files !== null) {
    const file = req.files.file;
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      let imgPath = "Images/BussinessImages/" + Date.now() + file.name;
      file.mv("public/" + imgPath, function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(imgPath);
        }
      });
    } else {
      res.status(200).send("Images/DefaultImage/default.png");
    }
  } else {
    res.status(200).send("Images/DefaultImage/default.png");
  }
});

app.post("/uploadofferimage", (req, res) => {
  if (req.files !== null) {
    const file = req.files.file;
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      let imgPath = "Images/OffersImages/" + Date.now() + file.name;
      file.mv("public/" + imgPath, function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(imgPath);
        }
      });
    } else {
      res.status(200).send("Images/DefaultImage/defaultoffer.png");
    }
  } else {
    res.status(200).send("Images/DefaultImage/defaultoffer.png");
  }
});

app.post("/regester", (req, res) => {
  db.addUser(req.body, (response) => {
    // try{
    res.send(response);
    // }
    // catch(e){

    // }
  });
});

app.get("/login", (req, res) => {
  console.log(req.body);
  db.login(
    { email: req.query.email, password: req.query.password },
    (response) => {
      res.send(response);
    }
  );
});

app.post("/forgetPassword", (req, res) => {
  db.forgetPassword(req.body, (response) => {
    res.send(response);
  });
});

app.get("/getBusinesses", (req, res) => {
  db.getBusinesses({ _id: req.query._id }, (response) => {
    res.send(response);
  });
});

app.put("/addBusiness/:id", (req, res, nxet) => {
  db.addBusiness(req.params.id, req.body, (response) => {
    res.send(response);
  });
});

// app.put("/removeBusiness/:userid", (req, res) => {
//   db.removeBusiness(req.params.userid, req.body, (response) => {
//     res.send(response);
//   });
// });

app.put("/removeBusiness", (req, res) => {
  db.removeBusiness(req.body, (response) => {
    res.send(response);
  });
});

app.put("/editBusiness/:userID/:bussID", (req, res) => {
  db.editBusiness(
    { userID: req.params.userID, bussID: req.params.bussID },
    req.body,
    (response) => {
      res.send(response);
    }
  );
});

app.put("/addOffer", (req, res) => {
  db.addOffer(req.body.ID, req.body.offer, (response) => {
    res.send(response);
  });
});

app.get("/getoffers", (req, res) => {
  db.getOffer(req.query.userID, req.query.bussID, (response) => {
    res.send(response);
  });
});

app.put("/removeoffer", (req, res) => {
  db.removeOffer(
    req.body.userID,
    req.body.offerID,
    req.body.bussID,
    (response) => {
      res.send(response);
    }
  );
});

app.put("/editoffer", (req, res) => {
  db.editOffer(
    req.body.userID,
    req.body.itemID,
    req.body.bussID,
    req.body.info,
    (response) => {
      res.send(response);
    }
  );
});
// ------------------Mobile App---------------------

app.get("/getTripsEntertainment", (req, res) => {
  db.getTripByEntertainment(parseInt(req.query.budget), (response) => {
    res.send(response);
  });
});

app.get("/getTripsRestaurant", (req, res) => {
  db.getTripByRestaurant(parseInt(req.query.budget), (response) => {
    res.send(response);
  });
});

app.get("/buildYourTrip", (req, res) => {
  db.buildYourTrip((response) => {
    res.send(response);
  });
});

// ------------------Mobile App---------------------

module.exports = app;
