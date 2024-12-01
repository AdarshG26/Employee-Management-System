const mongoose = require('mongoose')

const mongoUrl = process.env.MONGO_URL_LOCAL;

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to MongoDB serverrr');
});
db.on('error', (err)=>{
    console.log('Error in MongoDB serverrr: ',err);
});
db.on('disconnected', ()=>{
    console.log('Disconnected from MongoDB serverrr');
});

module.exports = db;  
