const mongoose = require("mongoose");
const config = require("./config.json");
main().catch((err) => console.log(err));

var Contact;
async function main() {
  await mongoose.connect(config.databaseConnectionString);
  const contactSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    phone: Number,
    message: String
  });
  Contact = mongoose.model('Contact', contactSchema);
}

const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});
app.get("/about", (req, res) => {
  const params = {};
  res.status(200).render("about.pug", params);
});
app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});
app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.status(200).render('contact.pug', { alert: 'Form was submitted successfully.' });
    }).catch((error) => {
        res.status(400).render('contact.pug', { alert: 'Form was not saved to the database.' });
    })
})

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
