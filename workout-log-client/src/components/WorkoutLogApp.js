import React, { Component } from 'react'
import WorkoutItemsList from './WorkoutItemsList'
import CreateWorkoutButton from './CreateWorkoutButton'
import { Jumbotron } from 'reactstrap';

export default class WorkoutLogApp extends Component {
  render() {
    return (
      <div>
        <Jumbotron><h1>Workout Log App</h1></Jumbotron>
        <CreateWorkoutButton />
        <WorkoutItemsList />
      </div>
    )
  }
}
