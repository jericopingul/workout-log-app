const workoutRoutes = require('./workout_routes');

module.exports = (app, db) => {
  workoutRoutes(app, db);

  // Other route groups go here...
};