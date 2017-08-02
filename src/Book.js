import React, { Component } from 'react'

class Book extends Component {
  state = {
    id: this.props.id,
    shelf: this.props.shelf,
    title: this.props.title,
    authors: this.props.authors,
    imageURL: this.props.imageURL
  }

  // handles updating state when a user selects a new shelf for a book
  handleShelf = (e) => {
    // grabs value selected from click event
    const newShelf = e.target.value
    // creates an object that updates the nested state for shelf
    this.setState({shelf: newShelf})
    // updates parent state
    if (this.props.onUpdateShelf) {
      this.props.onUpdateShelf(newShelf, this.state.id)
    }
  }

  render() {
    return(
      <div className="book" key={this.state.id}>
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${this.state.imageURL})`
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
        <div className="book-title">{this.state.title}</div>
        {this.state.authors !== undefined &&
          this.state.authors.map(author => (
            <div className="book-authors">{author}</div>
          ))
        }
      </div>
    )
  }
}

export default Book
