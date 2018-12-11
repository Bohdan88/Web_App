
var express = require('express')
var app = express()
var mongoose = require('mongoose');
var hbs = require('express-handlebars');

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'trial', layoutsDir: __dirname + 'public'}));



//var CONNECTION_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/patient_data"
var CONNECTION_URI = process.env.MONGODB_URI || "mongodb://Bohdan:Azaza1488@ds157923.mlab.com:57923/heroku_xr0xtncm"
var port = process.env.PORT || 5001;
engines = require('consolidate');
MongoClient = require('mongodb').MongoClient,
//var session = require('express-session'),
//MongoClient = require('connect-mongodb-session')(session);
assert = require('assert');
var patient = require('./patient');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//"test": "echo \"Error: no test specified\" && exit 1"
app.get("/" , (req, res) => {
   res.send("Hello Hospital!");  
  });
 

 
  
   
app.listen(port, () => {
    console.log("Server listening on port " + port);
   });

   
mongoose.connect(CONNECTION_URI,{ useNewUrlParser: true });

   // use case : Add patient 
   app.post("/patients", function (req, res) {
    console.log("in add");
    var p = new patient();
    p.full_name = req.body.full_name;
    p.age = req.body.age;
    p.adress = req.body.adress;
    p.phone = req.body.phone;
    p.disease = req.body.disease;
    p.doctor = req.body.doctor;

    p.status = req.body.status;

   
    p.save(function (err) {
        if (err) {
            res.send(err);
        }
        console.log("added");
        res.send({ message: 'Patient added!' })
    })
});

//use case :  view list of patients
app.get("/patients", function (req, res) {
    patient.find(function (err, patients) {
        if (err) {
            res.send(err);
        }
        res.send(patients);
    });
});

// trial shit 

app.get("/trial", function(req,res) {
    res
        .status(200)
        .sendFile(path.join(__dirname, "public/trial.hbs"));



});

var fs = require('fs')


function onRequest(req, res){
    res.writeHead(200, {'Content-type': 'text/html'});
    
    fs.readFile('./index.html', null, function(error,data) {
        if (error) {
            res.writeHead(404);
            res.write('File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });

}


var http = require('http')
http.createServer(onRequest).listen(5002)

var path = require("path");

app.use(express.static(__dirname + 'css'));



app.use(express.static(path.join(__dirname, "public")));

app.get("/main", function(req,res) {
        res
            .status(200)
            .sendFile(path.join(__dirname, "public/index.html"));



});

app.get("/personal", function(req,res) {
    res
        .status(200)
        .sendFile(path.join(__dirname, "public/personal.html"));



});

app.get("/trial", function(req,res) {
    res
        .status(200)
        .sendFile(path.join(__dirname, "public/trial.hbs"));



});


// insert trial 
var assert = require('assert')
var router = express.Router();
module.exports = router;



//  get data 

app.get("/get-data", function (req, res) {
    var resultArray = [];
    MongoClient.connect(CONNECTION_URI, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('user-data').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
        res.render('personal', {items: resultArray});
    });
});
   
  });



// insert 
//router.post('/insert', function(req, res, next) {
//   
//    var item  = {
//    title: full_name = req.body.full_name,
//    content: age = req.body.age,
//    author: adress = req.body.adress
//    };
//
//    mongo.connect(CONNECTION_URI, function(err, db) {
//        assert.equal(null, err);
 //       db.collection('user-data').insertOne(item, function(){
 //           assert.equal(null,error);
 //           console.log('Item inserted');
 //           db.close();
 //       });
 //   });
//
 //   res.redirect('/')
//});


// use case : Add patient 
app.post("/insert", function (req, res) {
    console.log("in add");
   var item  = {
        title: full_name = req.body.full_name,
        content: age = req.body.age,
        author: adress = req.body.adress
       };

 //  var item = new patient();
 // // item.age = req.body.age;
  // item.adress = req.body.adress;




          //

        MongoClient.connect(CONNECTION_URI, function(err, db) {
            if (err) throw err;
          //  var db = client.db('mytestingdb');
            //assert.equal(null, err);
            db.collection('user-data').insertOne(item, function(err, result) {
              assert.equal(null, err);
              console.log('Item inserted');
              db.close();
            });
          });
        
          res.redirect('/personal.html');
          // Use connect method to connect to the server
 
          //
});

///
app.use(express.static(path.resolve(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

///
var mongodb = require('mongodb');
var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017');



app.post('/post-feedback', function (req, res) {
    dbConn.then(function(db) {
      //  delete req.body._id; // for safety reasons
        db.collection('feedbacks').insertOne(req.body);
    });    
    res.send('Data received:\n' + JSON.stringify(req.body));
    
});

app.get('/view-feedbacks',  function(req, res) {
    dbConn.then(function(db) {
        db.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
            res.status(200).json(feedbacks);
        });
    });
});

app.post('/delete-feedback', function (req, res) {
    dbConn.then(function(db) {
        delete req.body._id; // for safety reasons
      // db.collection('feedbacks').findOneAndDelete({"Name" : "Arturo"});
      db.collection('feedbacks').findOneAndDelete(req.body);
    });    
    res.send('Data deleted:\n' + JSON.stringify(req.body));
});

var ObjectID = require('mongodb').ObjectID;

app.post('/update-feedback', function (req, res) {
    dbConn.then(function(db) {
        var id = req.body._id

        var name = req.body.Name
        var record = req.body.Records

   
     //  delete req.body._id; // for safety reasons
      // db.collection('feedbacks').findOneAndDelete({"Name" : "Arturo"});
    
      db.collection('feedbacks').update({_id: objectId(id)}, {$set:{"Name" : JSON.stringify(name), "Records" : JSON.stringify(record)}},{upsert:true})
    

   // db.collection('feedbacks').update({_id: objectId(id)})
});
res.send('Data deleted:\n' + JSON.stringify(req.body));
    });
       
  




app.delete('/view-feedbacks', function (req,res){
    
        dbConn.then(function(db) {
            db.collection('feedbacks').deleteMany({})
                res.status(200).json(feedbacks);
        if(err) { 
            res.send(err);
        }
    })
    res.json({message: 'Successfully deleted'})
})


var objectId = require('mongodb').ObjectID;
app.post('/delete', function (req,res){
    dbConn.then(function(db) {
        db.collection('feedbacks').findOneAndDelete(req.body) 
    })
})


/// form 


app.post('/post-user', function (req, res) {
    dbConn.then(function(db) {
      //  delete req.body._id; // for safety reasons
        db.collection('users').insertOne(req.body);
    });    
  //  res.send('Data posted:\n' + JSON.stringify(req.body));
    res.redirect('personal.html')
});


app.get('/view-users',  function(req, res) {
    dbConn.then(function(db) {
        db.collection('users').find({}).toArray().then(function(users) {
            res.status(200).json(users);
        });
    });
});

app.delete('/delete-users', function (req,res){
    
    dbConn.then(function(db) {
        db.collection('users').deleteMany({})
            res.status(200).json(users);
    if(err) { 
        res.send(err);
    }
})
res.json({message: 'Successfully deleted'})
})





/////

  



//

//use case :  view list of patients
app.get("/patients/patient", function (req, res, next) {
   res.render('test', {output: req.param.patients})
});






// use case : list all patients
app.get('/patients', function (req,res){
    patient.find(function (err, patients){
        if(err){
            res.send(err);
        }
        res.send(patients)
    });
})






// use case: update patient 
app.put('/patients/:patient_id', function (req, res){
    patient.findById(req.params.patient_id, function(err, patient){
        if(err){
            res.send(err);
        }
        patient.full_name = req.body.full_name;
        patient.age = req.body.age;
        patient.adress = req.body.adress;
        patient.number = req.body.number;
        patient.disease = req.body.disease;
        patient.save(function(err){
            if (err)
                    res.send(err);

                    res.json({message: 'Patient data updated!'});

        });
        });
    });

// use case:dicharge patients 
app.delete('/patients/:patient_id', function (req, res){
    patient.findOneAndDelete(req.params.patient_id, function(err, patients){
        if(err){
            res.send(err);
        }
                    res.send(patients);
                   
                   // res.json({message: 'The patient is discharged!'});
        });
       
    });

//use case : view  patient
app.get('/patients/:patient_id', function (req,res){
    patient.findById(req.params.patient_id, function (err, patients){
        if(err){
            res.send(err);
        }
            res.send(patients);        
        });
   
})

// use case: add patient records

app.put('/patients/:patient_id/records', function (req, res){
    patient.findById(req.params.patient_id, function(err, patient){
        if(err){
            res.send(err);
        }
        patient.records = req.body.records;
       
        res.send(patients);        
        patient.save(function(err){
            if (err)
                    res.send(err);

                    res.json({message: 'Patient data updated!'});

        });
        });
    });

// use case: view patient records

app.get('/patients/:patient_id/records', function (req,res){
    patient.findById(req.params.patient_id, function (err, patient){
        if(err){
            res.send(err);
        }
            res.send(patient.records);        
        });
   
})


