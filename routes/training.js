var express = require("express");
var router = express.Router();

const Logs = require("../models/log");
const shell = require("shelljs");
require("date-utils");

router.post("/", function(req, res, next) {
    
  const { name, confidence } = req.body;
  try {
    shell.exec(`scripts/train.sh ./inferImages/image.jpg ${name}`, function(code, stdout, stderr) {
      if (stderr) throw stderr;
      const Log = new Logs({
        name: name,
        confidence: confidence
      });
      Log.save();
      res.json({ message: "trained successfully" });
    });
  } catch (err) {
    console.log(err);
  }

});

router.get("/", function(req, res, next) {});

module.exports = router;
