import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import axios from 'axios';
import { API_BASE } from '../ApiConfig';
import { MdDelete, MdEdit } from 'react-icons/lib/md';
import { Button, Modal, ModalHeader, ModalBody, 
  ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';

export default class WorkoutItem extends Component {
  constructor(props) {
    super(props)


    this.state = {
      modal: false,
      workoutTitle: props.title,
      workoutBody: props.workout
    };

    // TODO props.date # workout date

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    // this.toggle = 


  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    // this.forceUpdate();
  }

  handleDelete = () => {
    const { id /*, redrawList */ } = this.props;
    console.log('trying to delete workout with id:', id);


    // TODO dialog to confirm delete
    axios.delete(API_BASE + '/workouts/' + id)
    .then(response => {
      console.log(response.data);
    }).catch(err => {
      console.error('Error deleting workout with id:', id, err);
    });

    this.toggle();

    // redrawList(); // TODO
    window.location.reload();
  }

  handleEdit = () => {
    const { workoutTitle, workoutBody } = this.state;
    const { id } = this.props;

    axios({
      method: 'put',
      url: API_BASE + '/workouts/' + id,
      headers: { 'Content-Type': 'application/json' },
      data: {
        title: workoutTitle,
        body: workoutBody
      }
    }).then(response => {
      // TODO toast/notification
      console.log('Successfully edited workout');
    }).catch(err => {
      console.error('Error editing workout', err);
    });

    window.location.reload();
  }

   onChange = (evt) => {
    const state = this.state;
    state[evt.target.name] = evt.target.value;
    console.log('onChange.state:', state)
    this.setState(state);
  }
  
  render() {
    const { title, workout } = this.props;
    const { workoutTitle, workoutBody } = this.state;
    return (
      <div>
        <Alert color="dark">
          <span onClick={this.handleDelete}><MdDelete /></span>
          <span onClick={this.handleEdit} onClick={this.toggle}><MdEdit /></span>
          <h5>{title}</h5>
          <p>{workout}</p>
        </Alert>
        {/* TODO refactor Modal to common component */}
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Workout</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="workoutTitle">Title</Label>
                <Input type="text" name="workoutTitle" value={workoutTitle} id="workoutTitle" onChange={this.onChange} placeholder={workoutTitle}/>
              </FormGroup>
              <FormGroup>
                <Label for="workoutBody">Workout</Label>
                <Input type="textarea" name="workoutBody" value={workoutBody} id="workoutBody" onChange={this.onChange} placeholder={workoutBody}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleEdit}>Save</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
