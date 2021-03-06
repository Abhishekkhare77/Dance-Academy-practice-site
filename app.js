const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');
const port = 8000;
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactDance');
}
// Defining mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    emial: String,
    address: String,
    desc: String,
});
const contact = mongoose.model('contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact',(req,res)=>{
    const param ={}
    res.status(200).render('contact.pug',param);
})
//for Post Request 
app.post('/contact',(req,res)=>{
   var myData = new contact(req.body);
   myData.save().then(()=>{
       res.send("This item is being saved to the database")
   }).catch(()=>{
       res.status(400).send("Item was not saved to the database")
   });
    // res.status(200).render('contact.pug');
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});