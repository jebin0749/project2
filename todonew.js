const express= require('express');

const bodyParser= require('body-parser');
const { resetWatchers } = require('nodemon/lib/monitor/watch');

const app=express();
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("css"));

let items =[];
let workitems=[];
app.get("/",function(req,res)
{
    let today=new Date();
    var day="";
    let options ={
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day=today.toLocaleDateString("en-US",options);
    res.render("list",{kindOfDay: day,newlist:items});
    
});

app.post("/",function(req,res)
{
    let item=req.body.enter;
    if(req.body.button==="work")
    {
        workitems.push(item);
        res.redirect("/work");
    }
    else{

        items.push(item);
        res.redirect("/");
    }
    console.log(req.body);
});

app.get("/work",function(req,res)
{
    res.render("list",{kindOfDay: "work list",newlist:workitems});
});

app.post("/work",function(req,res)
{
    let item=req.body.enter;

    workitems.push(item);
    res.redirect("/work");

});


app.listen(3000,function()
{
    console.log("port is running successfully");
});