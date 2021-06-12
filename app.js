const express = require("express");
const database = require("./database/database.js");
//const fs = require("fs");

const app = express();

app.use(express.static("public"));

const bcrypt = require('bcrypt');




// ------------------------------------------



app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login/login.html")
})

app.get("/frontpage", (req, res) => {
    res.sendFile(__dirname + "/public/frontpage/frontpage.html")
})





app.post('/auth', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
        connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results, fields) => {
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


//-----------------------------------------------

app.listen(3000, (error) => { // error er af datatypen object
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", 3000);
});