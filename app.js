const express = require('express')

const app = express();

//Templating engine as ejs
app.set('view engine', 'ejs');

//Serving Static Files
app.use(express.static('public'))

//ROUTING

//Route for home page
app.get('/',(req,res)=>{
    res.render('Home');
})

//Route for about page
app.get('/about',(req,res)=>{
    res.render("About")
})

//Create Server
app.listen(3000, () => console.log('server running...'))