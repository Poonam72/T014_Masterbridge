const Course = require('../Models/Course');
const REDIS_PORT = process.env.PORT || 6379;
const redis = require('redis');

const client = redis.createClient(REDIS_PORT);

exports.AllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({});
    if (!courses) {
      return res.status(400).json({ msg: 'No courses availible now ...' });
    }
    client.setex('all_courses', 3600, JSON.stringify(courses));
    return res.status(200).json({ courses: courses });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.CreateCourse = async (req, res, next) => {
  try {
    req.body.Publisher = req.user._id;
    console.log(req.body);
    const course = await Course.create(req.body);
    return res.status(201).json({ success: true, data: course });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.UpdateCourse = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(500).json({ msg: Server_Error });
  }
};
