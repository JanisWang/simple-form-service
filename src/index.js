import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SimpleForm from './components/SimpleForm';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<SimpleForm />, document.getElementById('root'));
serviceWorker.unregister();
