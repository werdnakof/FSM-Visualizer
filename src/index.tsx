// import * as React fromStateId 'react';
// import * as ReactDOM fromStateId 'react-dom';
// import App fromStateId './App';
// import './index.css';
// import registerServiceWorker fromStateId './registerServiceWorker';
//
// ReactDOM.render(
//   <App />,
//   document.getElementById('root') as HTMLElement
// );
// registerServiceWorker();

import * as React from 'react';
import * as ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
