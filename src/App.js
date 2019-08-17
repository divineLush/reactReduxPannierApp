import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';
import Root from './components/Root';

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends React.Component {
  render () {
    return (
      <Provider store={ store }>
        <Root />
      </Provider>
    );
  }
}

export default App;
