const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require("cors");

const app = express();
require('dotenv').config();

//Templating engine as ejs
app.set('view engine', 'ejs');



//Serving Static Files
app.use(express.static('public'))


app.use(express.urlencoded({extended: false}))
app.use(express.json())

//middleware for override
app.use(methodOverride('_method'))

app.use(cors());

//Connect to mongoose
mongoose.connect("mongodb+srv://ericcapiz:akoarmy11@cluster0.xdy0d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true},() =>{
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

//Route for getting diary listing by id
app.get("/diary/:id", (req,res)=>{
    Diary.findOne({
        _id:req.params.id
    }).then(data => {
        res.render('Page', {data: data})
    }).catch(err => console.log(err))
})

//Route for edit
app.get('/diary/edit/:id',(req,res)=>{
    Diary.findOne({
        _id:req.params.id
    }).then(data =>{
        res.render('Edit',{data:data})
    }).catch(err =>console.log(err))

})

//Edit data
app.put('/diary/edit/:id',(req,res)=>{
    Diary.findOne({
        _id:req.params.id
    }).then(data =>{
        data.title = req.body.title
        data.description = req.body.description
        data.date = req.body.date

        data.save().then(()=>{
            res.redirect('/diary')
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})

//Delete 
app.delete('/data/delete/:id',(req,res)=>{
    Diary.remove({
        _id:req.params.id
    }).then(()=>{
        res.redirect('/diary')
    }).catch(err=>console.log(err))
})

//Create Server
app.listen(3000, () => console.log('server running...'))

