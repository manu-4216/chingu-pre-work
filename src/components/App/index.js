import React, { Component, Fragment } from 'react';
import './style.css';
import Header from '../Header';
import BooksIndex from '../BooksIndex';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />

        <div className="App-Body-Container">
          <div className="App-Body">
            <BooksIndex />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
