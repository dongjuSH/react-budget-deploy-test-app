import React, { Component } from 'react'
import './Alert.css'

/* export class Alert extends Component {
    render() {
        return (
            <div className={`alert alert-${this.props.type}`}>{this.props.text}</div>
        )
    }
} */

const Alert = ({type, text}) => {
  return (
    <div className={`alert alert-${type}`}>{text}</div>
  )
}

export default Alert