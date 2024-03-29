var express = require("express");
var router = express.Router();
var fs = require("fs");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    try {
      cb(null, "inferImages/");      
    } catch (error) {
      console.log(error);
      fs.mkdirSync('inferImages');
      cb(null, 'inferImages/')
    }
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const shell = require("shelljs");
require("date-utils");

console.log("Model imported");


var uploadDir = multer({ storage: storage });
/* GET home page. */
router.post("/", uploadDir.single("file"), function(req, res, next) {
  console.log("request received");
  
  console.log(req.file);
  try {
    shell.exec("scripts/infer.sh", function(code, stdout, stderr) {
      if (stderr) {
        if (stderr.match("Unable to find a face")) {
          throw "얼굴을 찾을 수 없음"
        }

      }
      let result = JSON.parse(stdout);
      
      res.json(result);
    });
  } catch (err) {
    console.log(err);
  }

});

router.get("/", function(req, res, next) {});

module.exports = router;
