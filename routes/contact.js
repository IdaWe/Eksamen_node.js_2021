const router = require("express").Router();

require('dotenv').config();



const nodemailer = require("nodemailer");

// POST route from contact form




router.post("/api/contact", (req, res) => {
    console.log(req.body);
    res.redirect("/contact")

    const transporter = nodemailer.createTransport({ // SMTP Transport
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        name: 'name',
        from: 'email',
        to: 'ida.wendel0@gmail.com',
        subject: req.body.subject,
        text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    }




    transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
            console.log('Error occured', error);
        } else {
            console.log('Email sent');
        }
    })

});

module.exports = {
    router: router // shorthand = router
};