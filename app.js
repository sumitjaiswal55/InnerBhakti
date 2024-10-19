const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Program = require("./models/programSchema.js")
const MONGO_URL = 'mongodb://127.0.0.1:27017/innerbhakti'
const ejsMate = require("ejs-mate");

main().then(() => {
    console.log("connected to db")
}).catch((err) =>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended: true}));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));




app.get("/", (req, res)=>{
    res.redirect("/program")
})



app.get("/program", async(req, res) =>{
    const allprograms = await Program.find({});
    res.render("./programs/index.ejs", {allprograms})
});

app.get("/program/:id", async (req, res) => {
    let { id } = req.params;
        const program = await Program.findById(id);
        res.render("./programs/show.ejs", { program});
});

app.get('/program/:id/song/:sectionIndex', async (req, res) => {
    try {
      const program = await Program.findById(req.params.id);
      const song = program.sections[req.params.sectionIndex];
      res.render('./programs/song.ejs', { song, program }); // Render the song page with EJS
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


app.get("/guide", (req, res)=>{
    res.render("./programs/guide.ejs")
});

app.get("/me", (req, res)=>{
    res.render("./programs/me.ejs")
});

app.get("*", (req, res)=>{
    res.redirect("/program")
})

app.listen(8080, () =>{
    console.log("server is listening to port 8080")
});

