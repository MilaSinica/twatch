import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/App';
import reducers from './reducers';

//redux devTools presetup. http://localhost:3000/?debug_session=%3Csome_string%3E - allows to
// start new debug session and save Redux Store data between refreshes - no data loss
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(reduxThunk)
));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);




