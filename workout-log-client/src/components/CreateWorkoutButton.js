import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, 
  ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import { API_BASE } from '../ApiConfig';
// import WorkoutActionModal from './WorkoutActionModal';

export default class CreateWorkoutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      workoutTitle: '',
      workoutBody: ''
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    this.forceUpdate();
  }

  onChange = (evt) => {
    const state = this.state;
    state[evt.target.name] = evt.target.value;
    console.log('onChange.state:', state)
    this.setState(state);
  }

  createWorkout = (evt) => {
    const { workoutTitle, workoutBody } = this.state;

    axios({
      method: 'post',
      url: API_BASE + '/workouts',
      headers: { 'Content-Type': 'application/json' },
      data: {
        title: workoutTitle,
        body: workoutBody
      }
    }).then(response => {
      // TODO toast/notification
      console.log('Successfully created workout');
    }).catch(err => {
      console.error('Error creating workout', err);
    });

    this.toggle();

    window.location.reload();
  }

  render() {
    const { workoutTitle, workoutBody, modal } = this.state;
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>Create Workout</Button>
          {/* modal ? 
          <WorkoutActionModal isOpen={true} toggle={this.toggle} onChange={this.onChange} workoutTitle={workoutTitle} workoutBody={workoutBody}/>
          : 
          <WorkoutActionModal isOpen={false} toggle={this.toggle} onChange={this.onChange} workoutTitle={workoutTitle} workoutBody={workoutBody}/>  */}
          
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create Workout</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="workoutTitle">Title</Label>
                <Input type="text" name="workoutTitle" value={workoutTitle} id="workoutTitle" onChange={this.onChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="workoutBody">Workout</Label>
                <Input type="textarea" name="workoutBody" value={workoutBody} id="workoutBody" onChange={this.onChange}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.createWorkout}>Submit</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
