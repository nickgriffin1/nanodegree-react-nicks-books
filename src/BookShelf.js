import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookShelf extends Component {
  state = {
    books: this.props.books
  }

  updateShelf = (id, shelf) => {
    const currentBook = this.props.books.filter((book) => book.id === id)
    console.log('book going from ' + currentBook.shelf + ' to ' + shelf)
    if (currentBook.shelf !== shelf) {
      // update server
      BooksAPI.update({ id: id }, shelf).then((data) => {
        if (!data.error) {
          const booksCopy = [...this.props.books]
          booksCopy.forEach((book) => {
            if (book.id === id) {
              book.shelf = shelf
            }
          })

          // sets state for books
          this.setState({ books: booksCopy })

          // sets state for bookShelf which is passed to App and then SearchView
          this.props.onUpdateBookShelf(booksCopy)
        } else {
          console.log('API error from BooksAPI.update()')
          console.log('Error', data.error)
        }
      })
    }
  }

  render() {
    return (
      <div className="bookshelf" key={this.props.name}>
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.filteredBooks !== undefined
              && this.props.filteredBooks.map((book) => (
                <li key={book.id}>
                  <Book
                    id={book.id}
                    title={book.title}
                    shelf={book.shelf}
                    authors={book.authors}
                    imageURL={book.imageLinks.thumbnail}
                    categories={this.props.categories}
                    onUpdateShelf={(shelf, id) => this.updateShelf(shelf, id)}
                  />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
