const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();

// Define routes

//Admin routes
router.post('/createTeacher', controller.createTeacher);
router.get('/getTeacher/:id', controller.getTeacher);
router.put('/updateTeacher/:id', controller.updateTeacher);
router.delete('/deleteTeacher/:id', controller.deleteTeacher);
router.post('/createDiscipline', controller.createDiscipline);
router.get('/getDiscipline/:id', controller.getDiscipline);
router.put('/updateDiscipline/:id', controller.updateDiscipline);
router.delete('/deleteDiscipline/:id', controller.deleteDiscipline);
router.post('/createClass', controller.createClass);
router.delete('/deleteClass/:id', controller.deleteClass);
router.put('/updateClass/:id', controller.updateClass);

//User routes
router.get('/getClass/:id', controller.getClass);
router.get('/getAllClasses', controller.getAllClasses);

// Posts routes
router.get('/posts', controller.getAllPosts);
router.get('/posts/:id', controller.getPostById);
router.post('/posts', controller.createPost);
router.put('/posts/:id', controller.updatePost);
router.delete('/posts/:id', controller.deletePost);

module.exports = router;