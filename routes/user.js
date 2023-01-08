const express = require('express');
const router = express.Router();
const {
    getAllUser, 
    userRegister,
    userLogin,
    addCardData,
    setBoardData,
    getSinglePlayer,
    // singlePlayer,
    // getUserCardDetails
} = require('../controller/user');

const validateToken = require('../middleware/authHandler')
router.route('/').get(getAllUser);
router.route('/user/register').post(userRegister);
router.route('/user/login').post(userLogin);

router.route('/user/board-data').patch(validateToken,setBoardData);
router.route('/user/add-card').post(validateToken,addCardData);
router.route('/user/get-single-Player/:playerId').get(validateToken,getSinglePlayer);
// router.route('/user/getPlayer').post(singlePlayer);
// router.route('/user/card/details').get(getUserCardDetails)


module.exports = router