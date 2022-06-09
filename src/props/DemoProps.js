import React, { Component } from 'react'

export default class DemoProps extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
      <div>
        Hello {this.props.title}
      </div>
    )
  }
}
