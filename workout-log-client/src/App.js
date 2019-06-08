import React, { Component } from 'react';
// import logo from './logo.svg';
import WorkoutLogApp from './components/WorkoutLogApp'
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <WorkoutLogApp />
      </div>
    );
  }
}