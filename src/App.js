import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import NotFound from './404'
import SearchView from './SearchView'
import ListView from './ListView'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="list-books-title">
          <h1>Nick's Reads</h1>
        </div>
        <Route exact path='/' render={() => (
          <ListView/>
        )}/>
        <Route exact path='/search' render={() => (
          <SearchView/>
        )}/>
        <Route path='/404' component={NotFound} />
      </div>
    )
  }
}

export default BooksApp
