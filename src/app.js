const path = require("path");
const express = require('express');
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname));

// define paths for express config 
const publicdirpath = path.join(__dirname,'../public');
const viewspath = path.join(__dirname,"../templates/views");
const partials = path.join(__dirname,"../templates/partials");

//setup handlebars engines and location
app.set('view engine','hbs');
app.set("views",viewspath);
hbs.registerPartials(partials);

//setup stataic directory to serve
app.use(express.static(publicdirpath));

app.get("",(req,res) => {
    res.render("index",{
        title:'Weather ',
        name:'Shahnazar '
    });
})
app.get("/about",(req,res) => {
    res.render("about",{
        title:'About me',
        name:'Shahnazar '
    });
})
app.get("/help",(req,res) => {
    res.render("help",{
        title:"Help",
        name:"Shahnazar",
        helptext:"This is something useful for help"
    });
})

// app.get("",(req,res) => {
//     res.send("<h1>Hello Express</h1>");
// })
// app.get("/help",(req,res) => {
//     res.send({
//         Name:"Shahnazar",
//         pc:"Acer"
//     });
// })
// app.get("/about",(req,res) => {
//     res.send([{
//         name:"junaid"
//     },{
//         age:undefined
//     }]);
// })
app.get("/weather" ,(req,res) => {
    if (!req.query.address) {
        return res.send({
            error:"Adress must be provided!"
        })
    }
    geocode(req.query.address , (error, { lattitude,longitude,location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(lattitude,longitude , (error,forecastdata) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast:"It is snowing",
    //     location:"Philadelphia",
    //     address:req.query.address
    // })
})
app.get("/products",(req,res) => {
    if (!req.query.search) {
        return res.send({
            error:"You must provide a search term!"
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})
app.get("/help/*" , (req,res) => {
    res.render("404", {
        title:"404",
        name:"Shahnazar",
        errormsg:"Help article not found!"

    })
})
app.get("*",(req,res) => {
    res.render("404" ,{
        title:"404",
        name:"Shahnazar",
        errormsg:"Page not found!"
    })
})
app.listen(3000,() => {
    console.log("server is on 3000 port");
})