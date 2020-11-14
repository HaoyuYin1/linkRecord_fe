import { Button, Header, Image, Modal, Tab } from 'semantic-ui-react'
import CustomForm from './customForm'
import React, { Component, connect } from 'react'
import Preview from './preview';
import axios from "axios";
import { withRouter } from "react-router-dom";
class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreview: false,
      open: false,
      customForm: {}
    };
  }

  handlePreview = () => {
    if (Object.keys(this.state.customForm).length > 0) {
      console.log(this.state.customForm)
      this.setState({ showPreview: true });
    }
  }

  setOpen = (open) => {
    if (!open) {
      this.setState({ showPreview: false, customForm: {} })
    }
    this.setState({ open })
  }

  formValueChange = (name, value) => {
    const form = this.state.customForm
    form[name] = value
    this.setState({ customForm: form })
  }

  submitProduct = () => {
    console.log( this.state.customForm)
    
    axios.post('/product', this.state.customForm)
      .then(response => {
        if (response.status == 200) {
          console.log(response)
          // this.props.history.push('/')
          this.props.history.push('/test')
        }
      })
  }


  render() {
    const panes = [
      {
        menuItem: 'Customer',
        render: () => <Tab.Pane attached={false}>
          <CustomForm formValueChange={this.formValueChange}></CustomForm>
        </Tab.Pane>,
      },
      {
        menuItem: 'Nike',
        render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
      },
      {
        menuItem: 'Yeezy',
        render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
      },
    ]

    return (
      <Modal
        closeOnEscape={false}
        closeOnDimmerClick={false}
        onClose={() => this.setOpen(false)}
        onOpen={() => this.setOpen(true)}
        open={this.state.open}
        trigger={<Button>Add</Button>}
      >
        <Modal.Content>
          {/* <Tab menu={{ secondary: true, pointing: true }} panes={panes} /> */}
          <CustomForm formValueChange={this.formValueChange}></CustomForm>
          {this.state.showPreview ? <Preview product={this.state.customForm}></Preview> : null}
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => this.setOpen(false)}>
            Cancel
              </Button>
          <Button onClick={this.handlePreview}>
            Preview
              </Button>
          <Button
            content="Add"
            labelPosition='right'
            icon='checkmark'
            onClick={this.submitProduct}
            positive
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default withRouter(AddModal);