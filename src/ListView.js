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
                        <Book key={book.id} data={book}/>
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
                        <Book key={book.id} data={book}/>
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
