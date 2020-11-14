import React, { Component } from 'react'
import { Button, Grid, Icon, Image, Item, Label, Header, Divider, Checkbox, Table, Dropdown, Input } from 'semantic-ui-react'
import './links.css'

class links extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                name: 'test',
                price: 123.1,
                SKU: 'test sku',
                imageUrl: 'https://www.popsci.com/resizer/oBw2zifFCqH3deU6vy2bPRSG99Q=/760x456/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/WMD5M52LJFBEBIHNEEABHVB6LA.jpg'
            },
            links: [
                {
                    store: 'store1',
                    url: 'https://google.com',
                    name: 'name 1'
                },
                {
                    store: 'store1',
                    url: 'https://google.com',
                    name: 'name 1'
                },
            ],
            pendingLinks: [

            ]
        };
    }

    stores = [
        {
            key: 'Matt',
            text: 'Matt',
            value: 'Matt',
        },
        {
            key: '123',
            text: '123',
            value: '123',
        },
        {
            key: 'dsa',
            text: 'dsa',
            value: 'dsa',
        }
    ]

    appendPendingLink = () => {
        const pendingLinks = this.state.pendingLinks;
        pendingLinks.push({
            store: '',
            url: '',
            name: ''
        })
        this.setState({ pendingLinks })
    }

    pendingLinkValueChange = (name, value, index) => {
        console.log(value)
        const pendingLinks = this.state.pendingLinks;
        pendingLinks[index][name] = value;
        this.setState({ pendingLinks });
    }

    pendingLinkRemove = (index) => {
        const pendingLinks = this.state.pendingLinks;
        this.setState({ pendingLinks: pendingLinks.filter((pendingLink, i) => i !== index) });
    }

    render() {
        return (
            <Grid columns={1} >
                <Grid.Row>

                    <Button icon >
                        <Icon name='arrow left' />
                    </Button>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Item.Group>

                            <Item>
                                <Item.Image size="medium" src={this.state.product.imageUrl} />
                                <Item.Content verticalAlign='middle'>
                                    <Header size="huge" className="metaData">{this.state.product.name}</Header>
                                    <Item.Meta className="metaData">{this.state.product.SKU}</Item.Meta>
                                    {this.state.product.price ? <Item.Meta className="metaData">$ {this.state.product.price}</Item.Meta> : null}
                                    <Item.Extra>
                                        <Button primary floated='right'>
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
                                    <Table.HeaderCell><Icon name='folder' /></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            {
                                this.state.links.map((link, index) => (
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>{link.store}</Table.Cell>
                                            <Table.Cell>{link.url}</Table.Cell>
                                            <Table.Cell>{link.name}</Table.Cell>
                                            <Table.Cell>{index}</Table.Cell>
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
                                                <Input value={pendingLink.url} fluid type="text" placeholder="Link"
                                                    onChange={(event, { value }) => this.pendingLinkValueChange('url', value, index)} />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input value={pendingLink.name} fluid type="text" placeholder="Name"
                                                    onChange={(event, { value }) => this.pendingLinkValueChange('name', value, index)} />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button icon onClick={() => this.pendingLinkRemove(index)}>
                                                    <Icon name='folder' />
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
                                            <Icon name='user' /> Add User
                                        </Button>
                                        <Button size='small'>Save</Button>
                                        <Button disabled size='small'>
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