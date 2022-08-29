//Import React
import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';

//Import Main View
import MainView from './components/main-view/main-view';

//Import index.scss
import './index.scss';

const store = createStore(moviesApp);

// Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

//Finds root of the app
const container = document.getElementsByClassName('app-container')[0];

//Render app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
