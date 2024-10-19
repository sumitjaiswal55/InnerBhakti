require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Program = require("./models/programSchema.js");
const MONGO_URL = process.env.MONGO_URL;
const ejsMate = require("ejs-mate");

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit on error
    }
}

main();

app.set("view engine", "ejs");
app.set("views", path.join(dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(dirname, "/public")));
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.redirect("/program");
});

app.get("/program", async (req, res) => {
    const allprograms = await Program.find({});
    res.render("./programs/index.ejs", { allprograms });
});

app.get("/program/:id", async (req, res) => {
    let { id } = req.params;
    const program = await Program.findById(id);
    res.render("./programs/show.ejs", { program });
});

app.get('/program/:id/song/:sectionIndex', async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        const song = program.sections[req.params.sectionIndex];
        res.render('./programs/song.ejs', { song, program });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get("/guide", (req, res) => {
    res.render("./programs/guide.ejs");
});

app.get("/me", (req, res) => {
    res.render("./programs/me.ejs");
});

app.get("*", (req, res) => {
    res.redirect("/program");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server is listening to port", $=(PORT));
});