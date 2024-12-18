const express = require("express");
const app = express();
const path = require("path")
const usrmodule = require("./models/user");
const usermodel = require("./models/user");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/read", async (req, res) => {
    let alluser = await usermodel.find()
    res.render("read",{users:alluser})
})
app.get("/delete/:id", async (req, res) => {
    let alluser = await usermodel.findOneAndDelete({_id: req.params.id})
    res.redirect("/read")
})
app.get("/edit/:userid", async (req, res) => {
   let user = await usermodel.findOne({_id:req.params.userid})
   res.render("edit",{user})
  
})
app.post("/update/:userid", async (req, res) => {
    let {name,email,image }=req.body;
   let user = await usermodel.findOneAndUpdate({_id:req.params.userid} ,{image,name,email},{new:true})
   res.redirect("/read");
  
})
app.post("/create", async (req, res) => {
    let { name, email, image } = req.body;
    let createduser = await usermodel.create({
        name: name,
        email: email,
        image: image

    })
    res.redirect("/read")
})






app.listen(3000);
