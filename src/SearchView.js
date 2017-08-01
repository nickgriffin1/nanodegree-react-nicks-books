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
    ]
  }

  handleSearch = (e) => {
    const entry = this.formatEntry(e.target.value)
    if (this.state.possibleSearches.indexOf(entry) > -1) {
      console.log("hit")
      BooksAPI.search(entry, 3).then((data) => {
        console.log(data)
        if (!data.error) {
          this.setState({books: data})
        }
      })
    }
  }

  formatEntry = (entry) => {
    return entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase();
  }

  bookFound = () => {
    return this.state.books > 0 ? true : false
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" href="/">Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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
              <li>
                <Book
                  key={book.id}
                  data={book}
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
