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
      'Satire', 'Science fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale',
      'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality',
      'Web Development', 'iOS'
    ],
    lowerCasePossibleSearches: [],
    categories: this.props.categories
  }

  handleSearch = (e) => {
    const entry = this.formatEntry(e.target.value)
    // this array helps us by ignoring case
    this.state.possibleSearches.forEach(item => {
      this.state.lowerCasePossibleSearches.push(item.toLowerCase());
    })
    if (this.state.lowerCasePossibleSearches.indexOf(entry.toLowerCase()) > -1) {
      BooksAPI.search(entry, 20).then((data) => {
        if (!data.error) {
          this.setState({books: data})
        } else {
          console.log("Error: " + data.error)
        }
      })
    } else {
      this.setState({books: []})
    }
  }

  // kind of a hack so I don't have to reformat possibleSearches
  formatEntry = (entry) => {
    return entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase();
  }

  bookFound = () => {
    return this.state.books > 0 ? true : false
  }

  updateShelf = (id, shelf) => {
    // update server
    BooksAPI.update({id: id}, shelf).then((data) => {
      if (!data.error) {
        console.log("book added to shelf")
        // TODO add UI for informing users of a book being added
      } else {
        console.log("API error from BooksAPI.update()")
        console.log("Error", data.error)
      }
    })
  }

  // needed because pictures aren't always defined
  getPic = (book) => {
    console.log("book", book)
    try {
      return book.imageLinks.thumbnail
    } catch (e) {
      console.log("No thumbnail found: " + e)
    }
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
            {this.bookFound && this.state.books.map(book => (
              <li key={book.id}>
                <Book
                  id={book.id}
                  title={book.title}
                  shelf={"none"}
                  authors={book.authors}
                  imageURL={this.getPic(book)}
                  categories={this.state.categories}
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
