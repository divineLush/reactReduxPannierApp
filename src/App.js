import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';
import Root from './components/Root';
import { hasRole } from './auth';
import Button from 'react-bootstrap/Button';
import Header from './components/Header';
import './app.scss';

const store = createStore(rootReducer, applyMiddleware(thunk));

const user = {
  roles: ['user'],
};

const admin = {
  roles: ['admin'],
};

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: user
    }
  }

  render () {
    return (
      <div>
        <Header />
        { 
          hasRole(this.state.user, ['user']) &&
          <div className="content">
            <h1>Looks like youre just a user</h1>
            <Button 
              variant="outline-dark"
              size="lg" 
              onClick={ () => { this.setState({ user: admin }) } }
            >
              Oh no! I'm an admin!
            </Button>
          </div>
        }
        { 
          hasRole(this.state.user, ['admin']) && 
          <Provider store={ store }>
            <Root />
          </Provider> 
        }
      </div>
    )
  }
}

export default App;
