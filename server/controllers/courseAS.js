var createError = require("http-errors");
const CourseAS = require("../models/courseAS");
const user = require("../models/user");

exports.create = async (req, res) => {
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    const courseAS = new CourseAS({
      Name:req.body.Name,
      Description:req.body.Description,
      Domain:req.body.Domain,
      Chapter:req.body.Chapter
    });
    courseAS.save(courseAS)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while creating a create operation",
      });
    });
    

};
module.exports.CoursesASList = async (req, res) => {
  CourseAS.find(function(err, data) {
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
      }
  });  
};
module.exports.CoursesASFindOne = async (req, res) => {
  const id=req.params.id;
  CourseAS.findById(id).then((data) => {
     
          res.send(data);
     
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message 
    });
  });  
};
module.exports.CoursesASDel = async (req, res) => {
  const id=req.params.id;
  CourseAS.findByIdAndDelete(id).then((data) => {
     
        if (!data){
          res.status(404).send({message:'connot delete with ${id}'})
        }else {
          res.send({
            message:'del success'
          })
        }
     
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message 
    });
  });  
};
exports.CoursesASUpdate = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  const courseAS = new CourseAS({
    Name:req.body.Name,
    Description:req.body.Description,
    Domain:req.body.Domain,
    Chapter:req.body.Chapter,
    _id:id
  });
  CourseAS.findByIdAndUpdate(id, courseAS, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update CourseAS with id=${id}. Maybe CourseAS was not found!`
        });
      } else res.send(courseAS);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating CourseAS with id=" + id
      });
    });
};