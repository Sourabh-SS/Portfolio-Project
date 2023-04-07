const express=require("express");
const mongoose=require("mongoose");
const path=require("path");

mongoose.connect("mongodb+srv://srbhsharma125:3nYi1T19P2F6FeUS@cluster0.2vqk56z.mongodb.net/test",{useNewUrlParser: true});
const port=8000;
const app=express();

var contactSchema=new mongoose.Schema({
    name: String,
    email: String,
    message: String
})

var Contact=mongoose.model("Contact",contactSchema);

app.use("/static",express.static("static"))
app.use(express.urlencoded({extended:true}))

app.engine('html', require('ejs').renderFile);
app.set("view engine",'html')
app.set("views",path.join(__dirname,"views"))

app.get("/",(req,res)=>{
    const params={}
    res.status(200).render("index.html",params);
})

app.get("/contact",(req,res)=>{
    const params={}
    res.status(200).render("contact.html",params);
})


app.post("/contact",(req,res)=>{
    var myData=new Contact(req.body);
    console.log(req.body);
    myData.save().then(()=>{
        res.status(200).render("contact.html");
    }
).catch(()=>{
    res.status(404).send("Error Occurred!!")
})})

app.listen(port,()=>{
    console.log("Connected to the Port!!");
})



