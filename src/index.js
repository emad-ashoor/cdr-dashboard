// node libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// container & components
import AppLayout from './containers/app-layout';
import Store from './redux/store';
import * as serviceWorker from './serviceWorker';

// styles
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';

ReactDOM.render(<Provider store={Store}> <AppLayout /> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
