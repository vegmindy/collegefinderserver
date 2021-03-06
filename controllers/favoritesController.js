const express = require('express');
const router = express.Router();
const{Favorites} = require('../models/index');
const validateSession = require('../middleware/validateSession');
const { findOne } = require('../models/user');

// router.get("/all", (req, res) =>{
//     Favorites.findAll()
//     .then(data => res.status(200).json(data))
//     .catch(err => res.status(500).json(err))
// });

router.get("/myfavorites", validateSession, (req, res) => {
    let userid = req.user.id
    Favorites.findAll({where: {userID: userid}})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err}))
})

router.post("/addschool", validateSession, async (req, res) => {
    const { schoolName, address, inState, notes } = req.body;
    try{
        let newFavorites = await Favorites.create({
            // id: req.schools.id,
            schoolName,
            address,
            inState,
            notes,
            userID: req.user.id
        });
        
        res.status(200).json({
            favorites: newFavorites,
            message: "School added to favorites."
        })
    }
    catch(error) {
        res.status(500).json({message:"Server Error" + error})
    }
});

router.put('/updateschool/:id', validateSession, (req, res) => {
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

// router.delete('/delete/:id', (req, res) => {
//     Favorites.destroy({
//         where: { id: req.body.id}
//     })
//     .then(log => res.status(200).json(log))
//     .catch(err => res.json({error: err}))
// })

router.delete('/delete/:id', validateSession, function (req, res) {
    const query = { where: {id: req.params.id }};

    Favorites.destroy(query)
        .then(() => res.status(200).json({ message: 'School deleted'}))
        .catch((err) => res.status(500).json ({ error: err }));
});

module.exports = router;