import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, 
  ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';

export default class WorkoutActionModal extends Component {
constructor(props) {
  super(props)

  this.state = {
     modal: this.props.isOpen,
     workoutTitle: this.props.workoutTitle,
     workoutBody: this.props.workoutBody
  }
}

render() {
  const { workoutBody, workoutTitle } = this.state;
    return (
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
    )
  }
}
