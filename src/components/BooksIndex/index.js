import React, { Component, Fragment } from 'react';
import { Input } from 'semantic-ui-react';
import BooksList from '../BooksList';
import './style.css';
import { fetchVolumes } from '../../utils/api';
import { Loader } from 'semantic-ui-react';

let timeoutId;
let hasChanged = false;

class BooksIndex extends Component {
  state = {
    searchQuery: '',
    books: [],
    isLoading: false,
    error: ''
  };

  handleChange = (e, data) => {
    const searchQuery = data.value;

    hasChanged = true;

    if (!hasChanged) {
      return;
    }

    // Trigger the search after 500 ms of typing pause, to avoid having too many requests
    clearTimeout(timeoutId);
    timeoutId = setTimeout(this.triggerFetch(searchQuery), 500);
  };

  triggerFetch = searchQuery => () => {
    const that = this;

    this.setState({ searchQuery, isLoading: true, error: '' });

    fetchVolumes(searchQuery)
      .then(books => {
        that.setState({ books, isLoading: false });
      })
      .catch(err => {
        that.setState({
          error: err,
          isLoading: false
        });
      });
  };

  render() {
    const { searchQuery, books, isLoading, error } = this.state;

    let content;

    if (isLoading && !books.length) {
      content = <Loader active>Loading</Loader>;
    } else if (error) {
      content = <div>{error}</div>;
    } else {
      content = (
        <Fragment>
          {!!searchQuery && (
            <div className="Books-Filtered-Number">
              {books.length} results found
            </div>
          )}

          <BooksList isLoading={isLoading} error={error} books={books} />
        </Fragment>
      );
    }

    return (
      <div className="Book-Index">
        <Input
          className="Search-Input"
          icon="search"
          placeholder="Search..."
          onChange={this.handleChange}
        />
        {content}
      </div>
    );
  }
}

export default BooksIndex;
