import React, { Component } from 'react'

class Book extends Component {
  state = {
    book: this.props.data
  }

  // handles updating state when a user selects a new shelf for a book
  handleShelf = (e) => {
    // grabs value selected from click event
    const newShelf = e.target.value
    const book = {...this.state.book}
    // creates an object that updates the nested state for shelf
    book.shelf = newShelf
    this.setState({book})
    // updates parent state
    if (this.props.onUpdateShelf) {
      this.props.onUpdateShelf(newShelf, this.state.book.id)
    }
  }

  authorExists(book) {
    return this.state.book.authors.length > 0 ? true : false
  }

  render() {
    return(
      <div className="book" key={this.state.book.id}>
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${this.state.book.imageLinks.thumbnail})`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              defaultValue={this.state.book.shelf}
              onChange={this.handleShelf}
            >
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.state.book.title}</div>
        {this.state.authors !== undefined &&
          this.state.book.authors.map(author => (
            <div className="book-authors">{author}</div>
          ))
        }
      </div>
    )
  }
}

export default Book
