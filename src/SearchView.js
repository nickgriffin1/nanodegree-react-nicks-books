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

  componentDidMount() {
    // this array helps us ignore case, yes I'm lazy
    this.state.possibleSearches.forEach(item => {
      this.state.lowerCasePossibleSearches.push(item.toLowerCase());
    })
  }

  handleSearch = (e) => {
    const entry = e.target.value
    if (this.state.lowerCasePossibleSearches.indexOf(entry.toLowerCase()) > -1) {
      BooksAPI.search(entry, 20).then((data) => {
        if (!data.error) {
          this.setState({ books: data })
        } else {
          console.log('Error: ' + data.error)
        }
      })
    } else {
      this.setState({ books: [] })
    }
  }

  bookFound = () => this.state.books > 0 ? true : false

  updateShelf = (id, shelf) => {
    // update server
    BooksAPI.update({ id: id }, shelf).then((data) => {
      if (!data.error) {
        // TODO add UI for informing users of a book being added
        console.log('book added to shelf')
      } else {
        console.log('API error from BooksAPI.update()')
        console.log('Error', data.error)
      }
    })
  }

  // needed because pictures aren't always defined
  getPic = (book) => {
    try {
      return book.imageLinks.thumbnail
    } catch (e) {
      console.log('No thumbnail found: ' + e)
    }
  }

  setShelf = (bookID) => {
    var shelf = 'none'
    Object.keys(this.props.bookShelf).forEach((item) => {
      const currentShelf = this.props.bookShelf[item]
      currentShelf.forEach((id) => {
        if (id === bookID) {
          shelf = item
          return
        }
      })
    })
    return shelf
  }

  render() {
    console.log('this.props.bookShelf', this.props.bookShelf)
    return (
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
                  shelf={this.setShelf(book.id)}
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
