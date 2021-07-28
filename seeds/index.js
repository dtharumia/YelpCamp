const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    // const c = new Campground({ title: 'purple field' });
    // await c.save();
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60ff207bdfdad71466444c52',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}  ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni atque nesciunt error illum unde, reprehenderit blanditiis accusantium necessitatibus alias natus est incidunt quisquam assumenda placeat dolorem veritatis doloribus aliquid nisi!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dtharumia/image/upload/v1627439203/YelpCamp/dgt5cnjovu2jdudzlvji.jpg',
                    filename: 'YelpCamp/dgt5cnjovu2jdudzlvji'
                },
                {
                    url: 'https://res.cloudinary.com/dtharumia/image/upload/v1627439203/YelpCamp/eurzsibhdhxvziytimvb.jpg',
                    filename: 'YelpCamp/eurzsibhdhxvziytimvb'
                }

            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})