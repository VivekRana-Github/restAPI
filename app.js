const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/apiDB",  {useNewUrlParser: true});

const taskSchema ={
  taskName : String,
  taskDiscription : String,
  creator : String,
  duration : Number,
  created_at: { type: Date, default: Date.now },
  };

const task = mongoose.model("task", taskSchema);




app.get("/list",function (req , res) {
  task.find(function(err, foundTasks){
    if (!err) {
      res.send(foundTasks);
    } else {
      res.send(err);
    }
  });
})

app.post("/add" , function (req , res) {

  const newTask = new task ({
    taskName : req.body.taskName,
    taskDiscription : req.body.taskDiscription,
    creator : req.body.creator,
    duration: Number(req.body.duration)
  });
  newTask.save(function (err, data) {

    if (!err){
      res.send("Successfully added a new article.");
      console.log(data);
      let k = setTimeout(function(){
        console.log("Hello");
        task.findOneAndDelete({_id: data._id}, function(err){})
        console.log({k});
        clearTimeout(k);

      }, Number(req.body.duration)*60000)
    }

    else {
      res.send(err);
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

