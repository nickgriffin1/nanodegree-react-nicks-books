import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import NotFound from './404'
import SearchView from './SearchView'
import ListView from './ListView'

class BooksApp extends React.Component {
  state = {
    categories: [
      {
        title: 'Currently Reading',
        key: 'currentlyReading'
      },
      {
        title: 'Want to Read',
        key: 'wantToRead'
      },
      {
        title: 'Read',
        key: 'read'
      }
    ],
    bookShelf: [],
    books: []
  }

  componentDidMount = () => {
    // getting state of bookshelf
    BooksAPI.update({}, 'read').then((data) => {
      this.setState({ bookShelf: data })
    })
  }

  setBookShelf = (bookShelf) => {
    this.setState({ bookShelf })
  }

  render() {
    //console.log('this.state.categories', this.state.categories)
    //console.log('this.state.bookShelf', this.state.bookShelf)
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <div className="list-books-title">
              <h1>Nick's Reads</h1>
            </div>
            <ListView
              categories={this.state.categories}
              bookShelf={this.state.bookShelf}
              onUpdateApp={(books) => this.setState({ books })}
            />
          </div>
        )}/>
        <Route exact path="/search" render={() => (
          <div>
            <div className="list-books-title">
              <h1>Nick's Reads</h1>
            </div>
            <SearchView
              categories={this.state.categories}
              bookShelf={this.state.bookShelf}
              onUpdateBookShelf={(bookShelf) => this.setBookShelf(bookShelf)}
            />
          </div>
        )}/>
        <Route path="/404" component={NotFound}/>
      </div>
    )
  }
}

export default BooksApp
