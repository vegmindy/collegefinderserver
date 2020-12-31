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
    const { schoolName, address, inState, pros, cons, notes, top } = req.body;
    try{
        let newAccepted = await Accepted.create({
            schoolName,
            address,
            inState,
            pros,
            cons,
            notes,
            top,
            userID: req.user.id,
            schoolID: req.favorites.id
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

router.put('/updateschool/:id', (req, res) => {
    console.log(req.body)
    const query = req.params.id;
    Favorites.update(req.body, {where: {id: query}})
    .then(favoritesUpdated => {
        Favorites.findOne({where: {id: query}})
        .then(locatedUpdatedFavorites => {
            res.status(200).json({
                review: locatedUpdatedFavorites,
                message: 'School has been updated',
                favoritesChanged: favoritesUpdated
            })
        })
    })
})

router.delete('/delete/', (req, res) => {
    Favorites.destroy({
        where: { id: req.body.id}
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.json({error: err}))
})

module.exports = router;