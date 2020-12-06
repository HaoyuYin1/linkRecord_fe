import React, { Component } from 'react'
import { Segment, Input, Icon, Button, Grid, Card, Image, Header, Modal } from 'semantic-ui-react'
import AddModal from "./addModal";
import axios from 'axios'

class products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [
            ],
            filters:{
                name:""
            }
        };
    }

    /**
     * Load all products
     */
    componentDidMount = () => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/products`).
            then(response => {
                console.log(response)
                this.setState({products: response.data})
            })
    }

    /**
     * handle search input change
     */
    handleSearch = (event) => {
        const filters = this.state.filters;
        filters.name = event.target.value;
        this.setState({filters});
        console.log(event.target.value);
    }


    render() {
        return (
            <Grid stackable divided='vertically'>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Input inverted fluid icon placeholder='Search...'>
                            <input value={this.state.filters.name} onChange={this.handleSearch}/>
                            <Icon name='search' />
                        </Input>
                    </Grid.Column>
                    <Grid.Column>
                        <AddModal></AddModal>
                    </Grid.Column>
                </Grid.Row >
                <Grid.Row columns={4}>
                    {this.state.products.filter(product => {
                        if (this.state.filters.name) {
                            return product.name.toLowerCase().includes(this.state.filters.name.toLowerCase());
                        } else {
                            return true;
                        }
                    })
                    .map(product => (
                        <Grid.Column>
                            <Card href={'#' + product.sku}>
                                <Image src={product.imageUrl} wrapped></Image>
                                <Card.Content>
                                    <Card.Header style={{"overflow": "hidden"}}>{product.name}</Card.Header>
                                    <Card.Meta>
                                        <spanp>SKU: {product.sku} </spanp><br/>
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