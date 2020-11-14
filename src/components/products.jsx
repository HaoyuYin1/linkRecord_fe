import React, { Component } from 'react'
import { Segment, Input, Icon, Button, Grid, Card, Image, Header, Modal } from 'semantic-ui-react'
import AddModal from "./addModal";

class products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    name: 'test1',
                    price: 100.00,
                    imageUrl: 'https://via.placeholder.com/150',
                    SKU: '123-234',
                    releaseDate: '2020-01-01'
                },
                {
                    name: 'test1test1test1test1test1test1test1test1test1test1test1',
                    price: 100.00,
                    imageUrl: 'https://via.placeholder.com/150',
                    SKU: '123-234',
                    releaseDate: '2020-01-01'
                },
                {
                    name: 'test1',
                    price: 100.00,
                    imageUrl: 'https://via.placeholder.com/150',
                    SKU: '123-234',
                    releaseDate: '2020-01-01'
                }
            ]
        };
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
                            <Card href='#card-example-link-card'>
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