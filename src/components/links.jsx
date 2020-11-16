import React, { Component } from 'react'
import { Button, Grid, Icon, Image, Item, Label, Header, Divider, Checkbox, Table, Dropdown, Input } from 'semantic-ui-react'
import './links.css'
import axios from 'axios'

class links extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            links: [
            ],
            pendingLinks: [

            ]
        };
    }

    stores = [
        {
            key: 'KITH',
            text: 'KITH',
            value: 'KITH',
        },
        {
            key: 'Cncpts',
            text: 'Cncpts',
            value: 'Cncpts',
        },
        {
            key: 'Undftd',
            text: 'Undftd',
            value: 'Undftd',
        },
        {
            key: 'Jimmy Jazz',
            text: 'Jimmy Jazz',
            value: 'Jimmy Jazz',
        },
        {
            key: 'Dtlr',
            text: 'Dtlr',
            value: 'Dtlr',
        },
        
    ]

    componentDidMount = () => {
        const sku = this.props.match.params.linksId;
        axios.get(`${process.env.REACT_APP_DOMAIN}/product?sku=${sku}`).
            then(response => {
                console.log(response)
                const data = response.data
                this.setState({ product: data })
                if (data.websites) {
                    this.setState({ links: data.websites })
                }
            })
    }

    /**
     * when click add, push an empty object to pending list
     */
    appendPendingLink = () => {
        const pendingLinks = this.state.pendingLinks;
        pendingLinks.push({
            store: '',
            link: '',
            productName: ''
        })
        this.setState({ pendingLinks })
    }

    /**
     * update one pending link in the pending list array
     * @param {*} name 
     * @param {*} value 
     * @param {*} index 
     */
    pendingLinkValueChange = (name, value, index) => {
        console.log(value)
        const pendingLinks = this.state.pendingLinks;
        pendingLinks[index][name] = value;
        this.setState({ pendingLinks });
    }

    linkRemove = (index) => {
        const links = this.state.links;
        this.setState({ links: links.filter((link, i) => i !== index) });
    }

    /**
     * remove one pending link from pendinglist array
     * @param {number} index 
     */
    pendingLinkRemove = (index) => {
        const pendingLinks = this.state.pendingLinks;
        this.setState({ pendingLinks: pendingLinks.filter((pendingLink, i) => i !== index) });
    }

    /**
     * cancel all unsaved changes
     */
    cancelPendingLink = () => {
        this.setState({ pendingLinks: [] })
    }

    /**
     * save pending links to db and reset state
     */
    savePendingLink = () => {
        const { product, links, pendingLinks } = this.state
        product.websites = [...links, ...pendingLinks]
        axios.post('/links', product)
            .then(response => {
                const data = response.data
                this.setState({ product: data, pendingLinks: [] })
                if (data.websites) {
                    this.setState({ links: data.websites })
                }

            })
    }

    /**
     * remove product and back to homepage
     */
    deleteProduct = () => {
        const sku = this.props.match.params.linksId;
        axios.delete(`/product?sku=${sku}`)
            .then(response => {
                console.log(response)
                this.props.history.replace('')
            })
    }


    render() {
        return (
            <Grid columns={1} >
                <Grid.Row>
                    <Grid.Column>
                        <Button icon onClick={this.props.history.goBack}>
                            <Icon name='arrow left' />
                        </Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Item.Group>

                            <Item>
                                <Item.Image size="medium" src={this.state.product.imageUrl} />
                                <Item.Content verticalAlign='middle'>
                                    <Header size="huge" className="metaData">{this.state.product.name}</Header>
                                    <Item.Meta className="metaData">{this.state.product.sku}</Item.Meta>
                                    {this.state.product.price ? <Item.Meta className="metaData">$ {this.state.product.price}</Item.Meta> : null}
                                    <Item.Extra>
                                        <Button primary floated='right' onClick={this.deleteProduct}>
                                            Delete
                                        <Icon name='right chevron' />
                                        </Button>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </Item.Group>

                    </Grid.Column>
                </Grid.Row>
                <Divider inverted />
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Table celled inverted>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Store</Table.HeaderCell>
                                    <Table.HeaderCell>Link</Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Delete</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            {
                                this.state.links.map((link, index) => (
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>{link.store}</Table.Cell>
                                            <Table.Cell>{link.link}</Table.Cell>
                                            <Table.Cell>{link.productName}</Table.Cell>
                                            <Table.Cell>                                                
                                                <Button icon onClick={() => this.linkRemove(index)}>
                                                    <Icon name='trash alternate' />
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                ))
                            }
                            {
                                this.state.pendingLinks.map((pendingLink, index) => (
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Dropdown
                                                    fluid
                                                    search
                                                    selection
                                                    options={this.stores}
                                                    placeholder="Store"
                                                    value={pendingLink.store}
                                                    onChange={(event, { value }) => this.pendingLinkValueChange('store', value, index)}
                                                ></Dropdown>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input value={pendingLink.link} fluid type="text" placeholder="Link"
                                                    onChange={(event, { value }) => this.pendingLinkValueChange('link', value, index)} />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input value={pendingLink.productName} fluid type="text" placeholder="Name"
                                                    onChange={(event, { value }) => this.pendingLinkValueChange('productName', value, index)} />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button icon onClick={() => this.pendingLinkRemove(index)}>
                                                <Icon name='trash alternate' />
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                ))
                            }




                            <Table.Footer fullWidth>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='4'>
                                        <Button
                                            floated='right'
                                            icon
                                            labelPosition='left'
                                            primary
                                            size='small'
                                            onClick={this.appendPendingLink}
                                        >
                                            <Icon name='user' /> Add
                                        </Button>
                                        <Button size='small' onClick={this.savePendingLink}>Save</Button>
                                        <Button size='small' onClick={this.cancelPendingLink}>
                                            Cancel
                                        </Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>

                    </Grid.Column>

                </Grid.Row>
            </Grid>

        );
    }
}

export default links;