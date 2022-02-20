const express = require('express');
const router = express.Router();

const { CoursesController, usersController } = require('../controllers');

const { validateAuthorization } = require('../middlewares');

module.exports = function () {
  router.get('/api/courses', CoursesController.getCoursesByFilters); //
  router.get(
    '/api/courses/:id',

    CoursesController.getCourseById
  );

  router.get('/api/users', validateAuthorization, usersController.getUsers); //
  router.get(
    '/api/users/:userId',
    validateAuthorization,
    usersController.getUserById
  );
  router.get(
    '/api/users/email/:userEmail',
    validateAuthorization,
    usersController.getUserByEmail
  );
  router.put(
    '/api/users/recPassword/:id',
    validateAuthorization,
    usersController.updatePassword
  );
  router.get(
    '/api/users/password/:id',
    validateAuthorization,
    usersController.getPassword
  );
  router.put('/api/users/update/:userId', usersController.updateUser);
  router.post('/api/users/login', usersController.login);
  router.post('/api/users/register', usersController.register);
  router.get('/api/teachers', usersController.getTeachers);
  router.get('/api/teachers/:teacherId', usersController.getTeacherById);
  router.put('/api/teachers/new/:teacherId', usersController.createTeacher);
  router.delete('/api/users/delete/:id', usersController.deleteUser);

  router.post(
    '/api/users/:id/images',
    validateAuthorization,
    /*upload.single('image'),*/
    usersController.addAvatar
  );
  return router;
};
