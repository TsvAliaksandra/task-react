import React from 'react';
import ReactDOM from 'react-dom';
import Userform from './components/userform';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers/rootreducer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
    <MuiThemeProvider>
        <Userform />
    </MuiThemeProvider>
);

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById("reactcontainer"));


