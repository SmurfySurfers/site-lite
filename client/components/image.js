import React, {Component} from 'react'
import {connect} from 'react-redux'
import {selectElement} from '../store/editor'

class Img extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    if (event.target.id.length) {
      this.props.selectElement(Number(event.target.id))
    }
  }

  render() {
    if (this.props.html[this.props.id]) {
      return (
        <img
          id={this.props.id}
          style={this.props.html[this.props.id].style}
          className={`${this.props.editor.editModeEnabled ? 'edit-mode' : ''} ${
            this.props.editor.selectedElement == this.props.id ? 'selected' : ''
          }`}
          onClick={this.handleClick}
          src={
            this.props.html[this.props.id].content
              ? this.props.html[this.props.id].content
              : 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2011/05/New-York-City-skyline-cityscape-destinations-300x200.jpg'
          }
        />
      )
    } else {
      return <div />
    }
  }
}

const mapState = state => {
  return {
    html: state.renderer.present,
    editor: state.editor
  }
}

const mapDispatch = dispatch => {
  return {
    selectElement(id) {
      dispatch(selectElement(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Img)
