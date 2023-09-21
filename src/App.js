import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './redux/reducers';
import MainScreen from './components/MainScreen';
import ModalA from './components/ModalA';
import ModalB from './components/ModalB';
import ModalC from './components/ModalC';
import "./App.css"

const store = createStore(reducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <MainScreen />
        <ModalA />
        <ModalB />
        <ModalC />
      </div>
    </Provider>
  );
};

export default App;
