import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import undoable, {distinctState} from 'redux-undo'

import user from './user'
import renderer from './renderer'
import editor from './editor'
import template from './template'

const reducer = combineReducers({
  user,
  renderer: undoable(renderer),
  // renderer,
  editor,
  template
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
