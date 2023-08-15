const router = require('express').Router();
let Avenue = require('../model/avenue.model');

router.route('/').get((req,res) => {
    Avenue.find()
        .then(avenue => res.json(avenue))
        .catch(err => res.status(400).json('Error:'+err));
})

router.route('/add').post((req,res) => {
    const avenueName = req.body.avenueName;
    const avenueId = req.body.avenueId;
    const noOfMembers = req.body.noOfMembers;

    const newAvenue = new Avenue({
        avenueName,
        avenueId,
        noOfMembers,
    })

    newAvenue.save()
        .then(() => res.send("Avenue added"))
        .catch(err => res.status(400).json('Error:'+err));
})

module.exports = router;