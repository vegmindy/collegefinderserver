const express = require('express');
const router = express.Router();
const{Schools} = require('../models/index');
const validateSession = require('../middleware/validateSession');
const { findOne } = require('../models/user');

router.get("/all", (req, res) =>{
    Schools.findAll()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
})

// router.post("/add", (req, res) =>{
//     Schools
// })

router.post("/add", validateSession, async (req, res) => {
    const { id, schoolName, address, generalPhone } = req.body;
    try{
        console.log()
        let newSchool = await Schools.create({
            // id: req.schools.id,
            id,
            schoolName,
            address,
            generalPhone
        });
        
        res.status(200).json({
            accepted: newSchool,
            message: "School added."
        })
    }
    catch(error) {
        res.status(500).json({message:"Server Error" + error})
    }
});

router.put('/updateschool/:id', validateSession, (req, res) => {
    console.log(req.body)
    const query = req.params.id;
    Schools.update(req.body, {where: {id: query}})
    .then(schoolUpdated => {
        Schools.findOne({where: {id: query}})
        .then(locatedUpdatedSchool => {
            res.status(200).json({
                review: locatedUpdatedSchool,
                message: 'School has been updated',
                schoolChanged: schoolUpdated
            })
        })
    })
})

router.delete('/delete/:id', validateSession, function (req, res) {
    const query = { where: {id: req.params.id }};

    Schools.destroy(query)
        .then(() => res.status(200).json({ message: 'School deleted'}))
        .catch((err) => res.status(500).json ({ error: err }));
});

module.exports = router;