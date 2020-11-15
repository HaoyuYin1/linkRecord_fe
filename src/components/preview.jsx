import React, { Component } from 'react'
import { Item } from 'semantic-ui-react';

class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Item.Group>
                <Item>
                    <Item.Image  src={this.props.product.imageUrl} />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header>{this.props.product.name}</Item.Header>
                        <Item.Meta>{this.props.product.sku}</Item.Meta>
                        {this.props.product.price?<Item.Meta>$ {this.props.product.price}</Item.Meta>:null}
                    </Item.Content>
                </Item>
            </Item.Group>
        );
    }
}

export default Preview;