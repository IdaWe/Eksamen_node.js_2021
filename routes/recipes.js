const router = require("express").Router();

/*
    Project Schema
        Title - (string)
        Description: (string)
        StartDate: (date)
        EndDate: (date)
        Language(s): (array)
        Tech used: (array)
        Image: (string)
        HostedLink: (string)
        GitLink: (string)
*/

/* On the projects page fetch all the projects from the route below */


const recipes = [{
    title: "Life",
    description: "Personal blog about life",
    startDate: "Start dato: " + new Date("2021-02-24").toDateString(),
    endDate: "Slut dato: " + new Date("2021-11-08").toDateString(),
    cardPicture: src=""
},{
    title: "Favorite food",
    description: "A blog about my favorite food",
    startDate: "Start dato: " + new Date("2021-01-27").toDateString(),
    endDate: "Slut dato: " + new Date("2021-03-09").toDateString(),
    cardPicture: src=""
}]

router.get("/api/recipes", (req, res) => {
    res.send({ recipes });
});

module.exports = {
    router
};