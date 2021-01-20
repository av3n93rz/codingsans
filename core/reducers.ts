import {Reducer} from 'react'
import {InitialState, IssuesAction, SearchState, SearchAction} from './interfaces'

export const BreweriesReducer: Reducer<InitialState, IssuesAction> = (pageData, action)=> {
  switch (action.type) {
    case 'request':
      return {breweries: [], loading:true}
    case 'dataChange':
      return {breweries: action.payload, loading:false}
    default:
      return {breweries: [], loading:false}
  }
}

export const SearchReducer: Reducer<SearchState, SearchAction> = (searchRes, action) => {
  switch (action.type) {
    case 'request':
      return {results: [], loading:true}
    case 'result':
      return {results: action.payload, loading:false}
    case 'clear':
      return {results: [], loading:false};
    default:
      return {results: [], loading:false};
  }
}