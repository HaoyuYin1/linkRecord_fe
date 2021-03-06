import { BrowserRouter as Router, Route, NavLink, HashRouter, Switch } from 'react-router-dom'
import links from './components/links';
import products from './components/products';
import { Container, Header, Icon } from 'semantic-ui-react'


function App() {
  return (
    <Container style={{ margin: 20 }}>
      <Header as='h1' inverted color='grey'>
        <Header.Content>🔗 Link Recoder</Header.Content>
      </Header>
      <HashRouter>
        <Switch>
          <Route path="/:linksId" component={links}></Route>
          <Route path="/" component={products}></Route>
        </Switch>
      </HashRouter>

    </Container>
  );
}

export default App;
