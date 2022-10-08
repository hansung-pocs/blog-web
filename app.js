const dotenv = require('dotenv');
dotenv.config('.env');
console.log(process.env.MODE_ENV+" = "+process.env.DATABASE_URL);

const express=require('express');

const app=express();

app.engine('html', require('ejs').renderFile);
app.set('views','./html')
app.set('view engine', 'ejs');

app.listen(3000,(req,res)=>{
    console.log(`local:3000 is working!`);

})

app.get('/',(req,res)=>{
    console.log('main page!');
    res.render('main.html');
})