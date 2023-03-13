const db = require("../model");
const House = db.house;
const Review = db.review;
const multer = require('multer');
var applications = require("../model/applicationinfo");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

// Create and Save a new House
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    upload.single('file');
    // Create a House
    const house = new House({
        title: req.body.title,
        description: req.body.description,
        selectedFile: req.body.selectedFile,
        address: {
            city: req.body.city,
            province: req.body.province,
            street: req.body.street
        },
        category: req.body.category,
        rooms: req.body.rooms,
        people_count: req.body.people,
        bathrooms: req.body.bathrooms,
        price: req.body.price,
        email: req.body.email,
        phone: req.body.phone
    });
    // Save House in the database
    house
        .save(house)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the House."
            });
        });
};


exports.add_review = (req, res) => {

    const review = new Review({
        rating: req.body.rating,
        feedback: req.body.feedback,
        house_id: req.body.house_id,
        email: req.body.email

    });
    review
        .save(review)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Review."
            });
        });
};


exports.findAll = (req, res) => {
    const email = req.params.id;
    console.log(email);
    House.find({ email: email })
        .then(data => {
            console.log('data', data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Reviews."
            });
        });
};

// Find a single House with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    House.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found House with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving House with id=" + id });
        });
};

exports.findReviews = async (req, res) => {
    console.log("inside reviews");
    const user_id = req.params.id;
    var apps = await applications.find({ email: user_id, status: "Accept" });
    var ids = [];
    apps.map((item) => {
        ids.push(item.house_id)
    });

    House.find({ "_id": { $in: ids } }).then(data => {
        if (!data)
            res.status(404).send({ message: "Not found House with id " });
        else res.send(data);
    })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving House with id=" });
        });

};

exports.get_review = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    const email = req.params.email;
    console.log(id, email + "this is email");

    Review.find({ house_id: id, email: email })
        .then(data => {
            console.log("review" + data);
            if (!data)
                res.status(404).send({ message: "Not found Review with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Review with id=" + id });
        });

};

exports.edit_review = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    console.log(id);
    Review.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Review with id=${id}. Maybe Review was not found!`
                });
            } else res.send({ message: "Review was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating House with id=" + id
            });
        });
};

// Update a House by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    House.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update House with id=${id}. Maybe House was not found!`
                });
            } else res.send({ message: "House was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating House with id=" + id
            });
        });
};

// Delete a House with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    House.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete House with id=${id}. Maybe House was not found!`
                });
            } else {
                res.send({
                    message: "House was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete House with id=" + id
            });
        });
};

// Delete all Houses from the database.
exports.deleteAll = (req, res) => {
    House.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Houses were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};
