import React, { Component } from 'react'

class Book extends Component {
  state = {
    shelf: this.props.shelf
  }

  // handles updating state when a user selects a new shelf for a book
  handleShelf = (e) => {
    // grabs value selected from click event
    const newShelf = e.target.value

    // creates an object that updates the nested state for shelf
    this.setState({ shelf: newShelf })

    // updates parent state
    if (this.props.onUpdateShelf) {
      this.props.onUpdateShelf(this.props.id, newShelf)
    }
  }

  render() {
    return (
      <div className="book" key={this.props.id}>
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${this.props.imageURL})`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              defaultValue={this.state.shelf}
              onChange={this.handleShelf}
            >
              <option value="none" disabled>Move to...</option>
              {this.props.categories.map(category => (
                <option
                  key={category.key}
                  value={category.key}
                >{category.title}</option>
              ))}
              <option value="none">None - Delete from Shelf</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        {this.props.authors !== undefined
          && this.props.authors.map((author, index) => (
            <div className="book-authors" key={index}>{author}</div>
          ))
        }
      </div>
    )
  }
}

export default Book
