const { coursesRepository } = require('../repositories');

async function getCourses(req, res, next) {
  try {
    const { nivel, precio, tutor, valoracion, categoria } = req.body;
    const courses = await coursesRepository.findCourses(
      nivel,
      precio,
      tutor,
      valoracion,
      categoria
    );
    res.send(courses);
  } catch (err) {
    next(err);
  }
}

async function getCoursesByFilters(req, res, next) {
  try {
    const data = req.query;
    const queryRooms = await coursesRepository.filtersCourses(data);
    res.status(201);
    res.send(queryRooms);
  } catch (err) {
    next(err);
  }
}

async function getCourseById(req, res, next) {
  try {
    const { id } = req.params;
    const course = await coursesRepository.findCourseById(id);
    res.send(course);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCourses,
  getCourseById,
  getCoursesByFilters,
};
