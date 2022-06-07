const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const priceRand = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '629761fde3aa0b752eb22106',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero totam reiciendis blanditiis impedit atque necessitatibus. Repellat tempore quas adipisci deleniti eaque quo doloremque odio ut voluptatem! Modi blanditiis explicabo architecto.',
            price: priceRand,
            geometry: { 
              type : "Point", 
              coordinates : [ 
                cities[random1000].longitude,
                cities[random1000].latitude
               ]},
            images: [
                {
                  url: 'https://res.cloudinary.com/olegsyng/image/upload/v1654241643/YelpCamp/ar69ohlcszrse55zyfj9.jpg',
                  filename: 'YelpCamp/ar69ohlcszrse55zyfj9'
                },
                {
                  url: 'https://res.cloudinary.com/olegsyng/image/upload/v1654241644/YelpCamp/xsplregbbxjdfs7znb7q.jpg',
                  filename: 'YelpCamp/xsplregbbxjdfs7znb7q'
                },
                {
                  url: 'https://res.cloudinary.com/olegsyng/image/upload/v1654241645/YelpCamp/kdtftqr2paccflzlfrmz.jpg',
                  filename: 'YelpCamp/kdtftqr2paccflzlfrmz'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})