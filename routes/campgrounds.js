const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const campgroundsControllers = require('../controllers/campgrounds');
const multer  = require('multer');
const {storage} = require('../cloudinary/index');
const upload = multer({ storage });


router.route('/')
    .get(catchAsync(campgroundsControllers.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgroundsControllers.createCampground));
    
router.get('/new', isLoggedIn, campgroundsControllers.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgroundsControllers.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgroundsControllers.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgroundsControllers.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundsControllers.renderEditForm));

module.exports = router;