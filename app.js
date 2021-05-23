const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
dotenv.config();
//Templating engine as ejs
app.set('view engine', 'ejs');

//Serving Static Files
app.use(express.static('public'))

//BodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Connect to mongoose
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true},() =>{
    console.log("Connected to MongoDB")
})

//Import  Diary Model
const Diary = require('./models/Diary');


//ROUTING

//Route for home page
app.get('/',(req,res)=>{
    res.render('Home');
})

//Route for about page
app.get('/about',(req,res)=>{
    res.render("About")
})

//Route for diary page
app.get('/diary',(req,res)=>{
    Diary.find().then(data=>{
        res.render("Diary",{data})
    }).catch(err => console.log(err))
    
})

//Route for adding to diary
app.get('/add',(req,res)=>{
    res.render("add")
})

//Route for saving diary
app.post('/add-to-diary',(req,res)=>{
    const Data = new Diary({
        title:req.body.title,
        description:req.body.description,
        date: req.body.date
    })
    Data.save().then(()=>{
        res.redirect('/diary');
    }).catch(err => console.log(err));
})


//Create Server
app.listen(3000, () => console.log('server running...'))

