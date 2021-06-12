const express = require("express");
const database = require("./database/database.js");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(express.static("public"));
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const recipesRouter = require("./routes/recipes.js");
const contactRouter = require("./routes/contact.js");
app.use(recipesRouter.router);
app.use(contactRouter.router);

const fs = require("fs");

const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");
const frontpage = fs.readFileSync(__dirname + "/public/frontpage/index.html", "utf-8");
const contact = fs.readFileSync(__dirname + "/public/contact/contact.html", "utf-8");
const about = fs.readFileSync(__dirname + "/public/about/about.html", "utf-8");
const recipes = fs.readFileSync(__dirname + "/public/recipes/recipes.html", "utf-8");
const login = fs.readFileSync(__dirname + "/public/login/login.html", "utf-8");


// ------------------------------------------
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// ------------------------------------------


app.get("/login", (req, res) => {
    res.send(login)
})

app.get("/", (req, res) => {
    res.send(header + frontpage + footer)
})

app.get("/about", (req, res) => {
    res.send(header + about + footer);
});

app.get("/contact", (req, res) => {
    res.send(header + contact + footer);
});

app.get("/recipes", (req, res) => {
    res.send(header + recipes + footer);
});






app.post('/auth', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
        database.connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results, fields) => {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
                res.redirect('/frontpage');
            } else {
                res.redirect('/');
                res.end();
            }
        });
    } else {
        res.send('Indtast Email / Adgangskode');
        res.end();
    }
});

/*

app.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});



app.post('/register',  (req, res) => {
    const email = req.body.email;
    const plainPassword = req.body.password;
    let password = bcrypt.hashSync(plainPassword, 10);
    const data = {email, password};
    let sql = "INSERT INTO users SET ?";
    connection.query(sql, data,(err, results) => {
        if(err) {
            res.redirect('/signup');
            throw err;
        } else{
            res.redirect('/signup')
            confirmationMail(email);}
    });
});
*/

//-----------------------------------------------

app.listen(3000, (error) => { // error er af datatypen object
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", 3000);
});