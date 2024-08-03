const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String,
        required: true 
    },
    image: { 
        type: String, 
        set: (v) => v === "" ? "https://unsplash.com/photos/a-drawing-of-a-row-of-buildings-in-a-city-TBoRhQcjmGk" : v,
        default: "https://unsplash.com/photos/a-drawing-of-a-row-of-buildings-in-a-city-TBoRhQcjmGk"
    },
    price: { 
        type: Number, 
        required: true 
    },
    location: {
         type: String, 
         required: true 
        },
    country: { 
        type: String, 
        required: true 
    },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing; 