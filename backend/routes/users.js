/**
 * Express Module
 */
var express = require('express');

/**
 * Express Router
 */
var router = express.Router();

/**
 * User Controller
*/
var controller = require('../controllers/userController');

/**
 * Doctor Controller
*/
var doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', authMiddleware.authenticated, controller.list);
router.get('/doctors', doctorController.search);

module.exports = router;