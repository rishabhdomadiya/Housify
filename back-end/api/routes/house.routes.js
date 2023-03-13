const express = require("express");

const router = express.Router();

const house = require("../controller/housecontroller.js");

const multer = require('multer')
const upload = multer({ dest: 'images/' })

const fs = require("fs");

router.post("/", house.create);
router.get("/:id", house.findAll);
router.get("/:id/house", house.findOne);
router.get("/:id/reviews", house.findReviews);
router.put("/:id/edit-review-house", house.edit_review);
router.get("/:id/edit-review/:email", house.get_review);
router.post("/add-review", house.add_review);
router.put("/:id", house.update);
router.delete("/:id", house.delete);
router.delete("/", house.deleteAll);
router.post('/images', upload.single('image'), (req, res) => {
  const imagePath = req.file.path
  console.log(imagePath);
  res.send(imagePath)
})

router.get('/images/:imageName', (req, res) => {

  console.log("hello");
  const imageName = req.params.imageName;
  var some = "images/" + imageName;
  const readStream = fs.createReadStream(some)
  console.log(res);
  var some = readStream.pipe(res)
})

module.exports = router;