const express = require("express");
const app = express();
const port = 8080;
const path = require("path")
const methodOverride = require("method-override")
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main().then((res)=>{
    console.log("Connected Database !!!");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res)=>{
    res.send("Root")
});

app.get("/listing", async (req, res)=>{
    const allListings = await Listing.find();
    res.render("listings/index.ejs", {allListings});
});

app.get("/listing/new", (req, res)=>{
    res.render("listings/new.ejs");
})

app.get("/listing/:id", async (req, res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

app.get("/listing/new", (req, res)=>{
    res.render("listings/new.ejs");
})

app.post("/listing", async (req, res)=>{
    let { title, description, image, price, location, country } = req.body;
    const newListing = new Listing({title, description, image, price, location, country});

    await newListing.save().then((res)=>{
        console.log("Inserted Successfully")
    })

    res.redirect("http://localhost:8080/listing")
});

app.get("/listing/:id/edit", async (req, res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

app.put("/listing/:id", async (req, res)=>{
    const {id} = req.params;
    let {title, description, image, price, location, country } = req.body;
    await Listing.findByIdAndUpdate(id, {title, description, image, price, location, country});
    res.redirect(`http://localhost:8080/listing/${id}`)
});

app.delete("/listing/:id", async (req, res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    console.log("Entry Deleted");
    res.redirect("http://localhost:8080/listing");
});