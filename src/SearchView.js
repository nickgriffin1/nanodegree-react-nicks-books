import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchView extends Component {
  state = {
    books: [],
    possibleSearches: [
      'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen',
      'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business',
      'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket',
      'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama',
      'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film',
      'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi',
      'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey',
      'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make',
      'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting',
      'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript',
       'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling',
       'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale',
       'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality',
       'Web Development', 'Ios'
    ],
    categories: this.props.categories
  }

  handleSearch = (e) => {
    const entry = this.formatEntry(e.target.value)
    if (this.state.possibleSearches.indexOf(entry) > -1) {
      BooksAPI.search(entry, 3).then((data) => {
        if (!data.error) {
          this.setState({books: data})
        }
      })
    } else {
      this.setState({books: []})
    }
  }

  formatEntry = (entry) => {
    return entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase();
  }

  bookFound = () => {
    return this.state.books > 0 ? true : false
  }

  updateShelf = (id, shelf) => {
    // update server
    BooksAPI.update({id: id}, shelf).then((data) => {
      // error handling
      if (!data.error) {
        console.log("book added to shelf")
      } else {
        console.log("API error from BooksAPI.update()")
        console.log("Error", data.error)
      }
    })
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" href="/">Close</a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.bookFound && this.state.books.map((book, index) => (
              <li>
                <Book
                  key={index}
                  id={book.id}
                  title={book.title}
                  shelf={"none"}
                  authors={book.authors}
                  categories={this.state.categories}
                  imageURL={book.imageLinks.thumbnail}
                  onUpdateShelf={(shelf, id) => this.updateShelf(shelf, id)}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchView
