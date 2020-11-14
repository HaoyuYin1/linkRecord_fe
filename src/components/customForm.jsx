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

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]
class CustomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange = (e, { name, value }) => {
        this.props.formValueChange(name, value)
        // console.log(name, value)
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
                        label='SKU'
                        name="SKU"
                        placeholder='SKU'
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