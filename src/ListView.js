import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class ListView extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf = (shelf, id) => {
    // find the correct books and assigns the state update
    var newState = this.state.books.forEach((book) => {
      if (book.id === id) {
        //changes shelf to the correct shelf
        book.shelf = shelf
      }
    })
    // updates the state which updates the view
    this.setState({newState});
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books
                    .filter((book) => book.shelf === "currentlyReading")
                    .map(book => (
                      <li>
                        <Book
                          key={book.id}
                          data={book}
                          onUpdateShelf={(shelf, id) => {
                            this.updateShelf(shelf, id)
                          }}
                        />
                      </li>
                    ))
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books
                    .filter((book) => book.shelf === "wantToRead")
                    .map((book, index) => (
                      <li>
                        <Book
                          key={book.id}
                          data={book}
                          onUpdateShelf={(shelf, id) => {
                            this.updateShelf(shelf, id)
                          }}
                        />
                      </li>
                    ))
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books
                    .filter((book) => book.shelf === "read")
                    .map(book => (
                      <li>
                        <Book
                          key={book.id}
                          data={book}
                          onUpdateShelf={(shelf, id) => {
                            this.updateShelf(shelf, id)
                          }}
                        />
                      </li>
                    ))
                  }
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <a href="/search">Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListView
