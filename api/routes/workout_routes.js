var ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {


  /**
   * Get workout by id
   */
  app.get('/workouts/:id', (req, res) => {

    const id = req.params.id;

    console.log('get workout by id called with id: ' + id);

    console.log(typeof id);

    const idObject = { '_id': new ObjectID(id) };

    db.collection('workouts').findOne(idObject, (err, workout) => {
      if(err) {
        res.send({ 'error': 'Error in retrieving object with id: ' + id });
      } else {
        // send back newly created object
        console.log('workout found:', workout);
        res.send(workout);
      }
    });
  });

  /**
   * Create workout
   */
  app.post('/workouts', (req, res) => {
    
    const workout = {
      text: req.body.body,
      title: req.body.title
    };

    db.collection('workouts').insert(workout, (err, result) => {
      if(err) {
        res.send({ 'error': 'Error in inserting workout to collection.'});
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  /**
   * Delete workout by id
   */
  app.delete('/workouts/:id', (req, res) => {
    
    const id = req.params.id;
    const idObject = { '_id' : new ObjectID(id) };

    db.collection('workouts').remove(idObject, (err, workout) => {
      if(err) {
        res.send({ 'error': 'Error in deleting workout with id: ' + id});
      } else {
        res.send('Workout ' + id + ' deleted.');
      }
    });
  });

  /**
   * Update workout by id
   *  TODO need some conditional logic for empty fields to avoid nullification
   */
  app.put('/workouts/:id', (req, res) => {
    
    const id = req.params.id;
    const idObject = { '_id' : new ObjectID(id) };

    const workout = {
      title: req.body.title,
      text: req.body.body
    };

    db.collection('workouts').update(idObject, workout, (err, result) => {
      if(err) {
        res.send({ 'error': 'Error in updating note with id: ' + id });
      } else {
        res.send(workout);
      }
    });
  });
};