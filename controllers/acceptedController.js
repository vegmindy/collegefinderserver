const express = require('express');
const router = express.Router();
const{Accepted} = require('../models/index');
const validateSession = require('../middleware/validateSession');


router.get("/byuser", validateSession, (req, res) => {
    let ownerid = req.user.id
    Accepted.findAll({where: {userID: ownerid}})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err}))
})

router.post("/addschool", validateSession, async (req, res) => {
    const { schoolName, address, inState, pros, cons, notes, top, accepted } = req.body;
    try{
        console.log()
        let newAccepted = await Accepted.create({
            schoolName,
            address,
            inState,
            pros,
            cons,
            notes,
            top,
            userID: req.user.id,
            // id: req.schools.id,
            accepted
        });
        
        res.status(200).json({
            accepted: newAccepted,
            message: "Congrats! School added to your accepted list."
        })
    }
    catch(error) {
        res.status(500).json({message:"Server Error" + error})
    }
});

router.put('/updateschool/:id', validateSession, (req, res) => {
    console.log(req.body)
    const query = req.params.id;
    Accepted.update(req.body, {where: {id: query}})
    .then(acceptedUpdated => {
        Accepted.findOne({where: {id: query}})
        .then(locatedUpdatedAccepted => {
            res.status(200).json({
                review: locatedUpdatedAccepted,
                message: 'School has been updated',
                acceptedChanged: acceptedUpdated
            })
        })
    })
})

router.delete('/delete/:id', validateSession, function (req, res) {
    const query = { where: {id: req.params.id }};

    Accepted.destroy(query)
        .then(() => res.status(200).json({ message: 'School deleted'}))
        .catch((err) => res.status(500).json ({ error: err }));
});

module.exports = router;