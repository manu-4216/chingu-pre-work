import React, { Component, Fragment } from 'react';
import './style.css';

class BooksList extends Component {
  render() {
    const { books } = this.props;

    return (
      <Fragment>
        {books.length > 0 && (
          <ul className="List-Books">
            {books.map((book, key) => (
              <div className="Book" key={key}>
                <img
                  src={book.imageLinks && book.imageLinks.smallThumbnail}
                  className="Book-Image"
                  alt="book cover"
                />

                <div className="Book-Info">
                  <a href={book.infoLink} target="_blank">
                    <div className="Book-Header"> {book.title}</div>
                  </a>

                  <div className="Book-Author">
                    {' '}
                    Author:
                    {' ' + ((book.authors && book.authors[0]) || 'none')}
                  </div>
                  <div className="Book-Publisher">
                    Publisher: {book.publisher || 'unknown'}
                  </div>

                  <div className="Book-Description">{book.description}</div>
                </div>
              </div>
            ))}
          </ul>
        )}
      </Fragment>
    );
  }
}

export default BooksList;
