
const express =require("express");
const app = express();
const path =require("path");
const hbs=require("hbs");
require("./db/conn");
const Register = require("./models/registers");
//const { Resolver} = require("dns");
const{json}=require("express");
const port = process.env.PORT || 8000;

const static_path=path.join(__dirname, "../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

//app.use(express.static('views/images')); 

app.get("/",(req,res)=> {
    res.render("index")
    
});
app.get("/register",(req,res)=>
{
    res.render("register"); 
})
app.get("/login",(req,res)=>
{
    res.render("register"); 
})
app.post("/register",async(req,res)=>{
    try {
        const password = req.body.pass;
        const cpassword = req.body.re_pass;

        if(password === cpassword ){
            const studentReg = new Register({
                username:req.body.username,
                email:req.body.email,
                pass:req.body.pass,
                re_pass:req.body.re_pass

            })

            const registered = await studentReg.save();
            res.status(201).render("index");
      

        }else{
            res.send("Chutiye ho kya password bhi nhi shi daal pa rhe")
        }

    } catch (error) {
    res.status(400).send(error);
    }

})
app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
})