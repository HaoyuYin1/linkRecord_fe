import React, { Component } from 'react'
import { Segment, Input, Icon, Button, Grid, Card, Image, Header, Modal } from 'semantic-ui-react'
import AddModal from "./addModal";
import axios from 'axios'

class products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [
            ]
        };
    }

    componentDidMount = () => {
        axios.get('/products').
            then(response => {
                console.log(response)
                this.setState({products: response.data})
            })
    }


    render() {
        return (
            <Grid stackable>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Input inverted fluid icon placeholder='Search...'>
                            <input />
                            <Icon name='search' />
                        </Input>
                    </Grid.Column>
                    <Grid.Column>
                        <AddModal></AddModal>
                    </Grid.Column>
                </Grid.Row >
                <Grid.Row columns={4}>
                    {this.state.products.map(product => (
                        <Grid.Column>
                            <Card href={'#' + product.sku}>
                                <Image src={product.imageUrl} wrapped></Image>
                                <Card.Content>
                                    <Card.Header style={{"overflow": "hidden"}}>{product.name}</Card.Header>
                                    <Card.Meta>
                                        <spanp>SKU: {product.SKU} </spanp><br/>
                                        <span>price: {product.price}</span>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid>
        );
    }
}

export default products;