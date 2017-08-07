import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class ListView extends Component {
  state = {
    books: []
  }

  componentWillMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  setBooks = (books) => {
    this.setState({ books })
    this.props.onUpdateApp(books)
  }

  filterBooks = (key) => this.state.books.filter(book => book.shelf === key)

  render() {
    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            {this.props.categories.map(category => (
              <BookShelf
                key={category.key}
                name={category.key}
                title={category.title}
                books={this.state.books}
                categories={this.props.categories}
                filteredBooks={this.filterBooks(category.key)}
                onUpdateBookShelf={(books) => this.setBooks(books)}
              />
            ))}
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
