const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
var port = process.env.PORT || 3000;

const mc = require('mongodb').MongoClient;

const URL ="mongodb+srv://Twitter:msp15nk19@cluster0-kbyvm.mongodb.net/test?retryWrites=true&w=majority";
var dbo;


mc.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true},(error,client)=>{
    if(error){
        console.log("error in connection",error);
    }else{
        dbo = client.db("Twitter");
        console.log("DataBase Sucessfully connected....");
    }
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
}));

app.get('/',(req,res)=>{
    res.json({
        'Message':'salman-patel'
    });
});

app.post('/tweet',(req,res)=>{
    //console.log(req.body);
    const obj={
        name:req.body.name,
        content:req.body.content,
        date:req.body.created
    };
    dbo.collection('Account').insertOne(obj,(error,sucess)=>{
        if(error){
            console.log('error',error);
        }else{
            console.log('Data Inserted...');
        }
    });
});


app.get('/tweet',(req,res)=>{
    var cursor = dbo.collection('Account').find().toArray(function(err,results){
        console.log(results);
        res.send(results);
    });
    //console.log(cursor);
});


app.listen(port,()=>{
    console.log('Listening on port http://localhost:3000');
});