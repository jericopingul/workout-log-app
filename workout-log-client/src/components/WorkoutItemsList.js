import React, { Component } from 'react'
import WorkoutItem from './WorkoutItem'
import axios from 'axios';
import { API_BASE } from '../ApiConfig';

export default class WorkoutItemsList extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       workouts: []
    }

    this.redraw = this.redraw.bind(this);
    this.fetchWorkouts = this.fetchWorkouts.bind(this);
  }

  componentDidMount = () => {
    // axios.get(API_BASE + '/workouts').then(response => {
    //   console.log('cdm:', response.data);
    //   this.setState({
    //     workouts: response.data
    //   });
    // }).catch(err => {
    //   console.error('Error retrieving workouts: ', err)
    // });
    this.fetchWorkouts();
  }

  fetchWorkouts = () => {
    axios.get(API_BASE + '/workouts').then(response => {
      console.log('cdm:', response.data);
      this.setState({
        workouts: response.data
      });
    }).catch(err => {
      console.error('Error retrieving workouts: ', err)
    });
  }

  redraw = () => {
    this.fetchWorkouts();
    this.render();
  }


  render() {
    console.log("WorkoutItemsList:", this.state.workouts);
    return (
      <div>
        <div>
          <h1>WorkoutItemsList:</h1>
        </div>
          {
            this.state.workouts.map(workout => {
              return (<WorkoutItem key={workout._id} id={workout._id} title={workout.title} workout={workout.text} redrawList={this.redraw}/>)
            })
          }
      </div>
    )
  }
}