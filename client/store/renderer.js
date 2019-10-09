const CREATE_ELEMENT = 'CREATE_ELEMENT'
const REMOVE_ELEMENT = 'REMOVE_ELEMENT'
const UPDATE_STYLE = 'UPDATE_STYLE'
const SET_STATE = 'SET_STATE'
const SET_CONTENT = 'SET_CONTENT'
const SET_TEMPLATE_ID = 'SET_TEMPLATE_ID'

const initialState = {
  counter: 1,
  main: {style: {color: '#282e31'}, children: []}
}
export const createElement = (id, elementType) => ({
  type: CREATE_ELEMENT,
  id,
  elementType
})
export const removeElement = (id, elementId) => ({
  type: REMOVE_ELEMENT,
  id,
  elementId
})
export const updateStyle = (id, property, value) => ({
  type: UPDATE_STYLE,
  id,
  property,
  value
})
export const setState = state => ({
  type: SET_STATE,
  state
})
export const setContent = (id, content) => ({
  type: SET_CONTENT,
  id,
  content
})
export const setTemplateId = tid => ({
  type: SET_TEMPLATE_ID,
  tid
})

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_ELEMENT:
      return {
        ...state,
        counter: state.counter + 1,
        [action.id]: {
          ...state[action.id],
          children: [...state[action.id].children, state.counter]
        },
        [state.counter]: {
          type: action.elementType,
          content: '',
          style: {},
          children: []
        }
      }
    case REMOVE_ELEMENT:
      state[action.elementId].children.forEach(child => {
        delete state[child]
      })
      delete state[action.elementId]
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          children: state[action.id].children.filter(child => {
            return child !== action.elementId
          })
        }
      }
    case UPDATE_STYLE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          style: {
            ...state[action.id].style,
            [action.property]: action.value
          }
        }
      }
    case SET_STATE:
      return action.state
    case SET_CONTENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          content: action.content
        }
      }
    case SET_TEMPLATE_ID:
      return {
        ...state,
        templateID: action.tid
      }
    default:
      return state
  }
}
