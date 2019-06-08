var ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {

  /**
   * Get all workouts (all documents in workout collection)
   */
  app.get('/workouts', (req, res) => {

    console.log("get all workouts");

    db.collection('workouts').find({}).toArray((err, workouts) => {
      if(err) {
        res.send({ 'error': 'Error in retrieving all workouts: ' + err})
      } else {
        res.send(workouts);
      }
    });
  });

  /**
   * Get workout by id
   */
  app.get('/workouts/:id', (req, res) => {

    const id = req.params.id;

    console.log('get workout by id called with id: ' + id);

    const idObject = { '_id': new ObjectID(id) };

    db.collection('workouts').findOne(idObject, (err, workout) => {
      if(err) {
        res.send({ 'error': 'Error in retrieving object with id: ' + id });
      } else {
        // send back newly created object
        console.log('workout found at time:', new Date(), workout);
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

    console.log('creating workout:', req.body);

    console.log('created workout:', workout);

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