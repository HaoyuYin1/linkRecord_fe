import React, { Component } from 'react'
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
    TextArea,
} from 'semantic-ui-react'

class CustomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = (e, { name, value }) => {
        this.props.formValueChange(name, value)
    }

    render() {
        const { value } = this.state
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Field required
                        control={Input}
                        label='Name'
                        name="name"
                        placeholder='Name'
                        onChange={this.handleChange}
                    />
                    <Form.Field required
                        control={Input}
                        label='sku'
                        name="sku"
                        placeholder='sku'
                        onChange={this.handleChange}
                    />
                    <Form.Field required
                        control={Input}
                        label='price'
                        name="price"
                        placeholder='price'
                        onChange={this.handleChange}
                    />
                </Form.Group>
                    <Form.Field required
                        control={Input}
                        label='ImageUrl'
                        name="imageUrl"
                        placeholder='ImageUrl'
                        onChange={this.handleChange}
                    />
            </Form>
        )
    }
}

export default CustomForm;