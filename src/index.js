import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Playing from './components/playing';
import store from './redux/store';

const Root = (
    <Provider store={store}>
        <Playing />
    </Provider>
)

ReactDOM.render(Root, document.getElementById('root'));
