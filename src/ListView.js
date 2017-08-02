import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class ListView extends Component {
  state = {
    books: [],
    bookShelf: this.props.bookShelf,
    categories: this.props.categories
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf = (id, shelf) => {
    const currentBook = this.state.books.filter((book) => book.id === id)
    console.log("book going from " + currentBook.shelf+ " to " + shelf)
    if (currentBook.shelf !== shelf) {
      // update server
      BooksAPI.update({id: id}, shelf).then((data) => {
        if (!data.error) {
          const booksCopy = [...this.state.books]
          booksCopy.forEach((book) => {
            if (book.id === id) {
              book.shelf = shelf
            }
          })
          this.setState({books: booksCopy})
        } else {
          console.log("API error from BooksAPI.update()")
          console.log("Error", data.error)
        }
      })
    }
  }

  render() {
    console.log(this.props.bookShelf)
    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            {this.state.categories.map(category => (
              <div className="bookshelf">
                <h2 className="bookshelf-title">{category.title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.books
                      .filter((book) => book.shelf === category.key)
                      .map((book, index) => (
                        <li>
                          <Book
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            shelf={book.shelf}
                            authors={book.authors}
                            imageURL={book.imageLinks.thumbnail}
                            categories={this.state.categories}
                            onUpdateShelf={(shelf, id) => this.updateShelf(shelf, id)}
                          />
                        </li>
                      ))
                    }
                  </ol>
                </div>
              </div>
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
