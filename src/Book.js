import React, { Component } from 'react'

class Book extends Component {
  state = {
    book: this.props.data,
    shelf: this.props.data.shelf
  }

  handleShelf = (e) => {
    const newShelf = e.target.value
    console.log(this.state.shelf)
    this.setState({shelf: newShelf}, () => {
      console.log(this.state.shelf)
      this.forceUpdate();
    })
  }

  render() {
    return(
      <div className="book">
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
              defaultValue={this.state.shelf}
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
        {this.state.book.authors.map(author => (
          <div className="book-authors">{author}</div>
        ))}
      </div>
    )
  }
}

export default Book
