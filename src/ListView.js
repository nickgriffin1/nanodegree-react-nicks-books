import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class ListView extends Component {
  state = {
    books: [],
    categories: [
      {
        title: "Currently Reading",
        key: "currentlyReading"
      },
      {
        title: "Want to Read",
        key: "wantToRead"
      },
      {
        title: "Read",
        key: "read"
      }
    ]
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
    // update server
    BooksAPI.update(id, shelf).then((data) => {
      console.log("Got data return from UPDATE")
      console.log(data)
    })
  }

  render() {
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
                            key={index}
                            id={book.id}
                            title={book.title}
                            shelf={book.shelf}
                            authors={book.authors}
                            imageURL={book.imageLinks.thumbnail}
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
