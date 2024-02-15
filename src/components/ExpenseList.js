import React, { Component } from 'react'
import "./ExpenseList.css"
import ExpenseItem from './ExpenseItem'
import { MdDelete } from 'react-icons/md'

export class ExpenseList extends Component {
  render() {
    return (
      <div>
        <ul className='list'>
          {this.props.expenses.map(expense => {
            return (
              <ExpenseItem
                expense={expense}
                key={expense.id}
                handleDelete={this.props.handleDelete}
                handleEdit={this.props.handleEdit}
              />
            )
          })}
        </ul>
        {this.props.expenses.length > 0 && (
          <button className='btn' onClick={this.props.clearItems}>
            목록지우기
            <MdDelete />
          </button>
        )}
      </div>
    )
  }
}

/* const ExpenseList = ({ handleDelete, expenses, handleEdit, clearItems }) => {
  return (
    <div>
      <ul className='list'>
        {expenses.map(expense => {
          return (
            <ExpenseItem
              expense={expense}
              key={expense.id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )
        })}
      </ul>
      {expenses.length > 0 && (
        <button className='btn' onClick={clearItems}>
          목록지우기
          <MdDelete />
        </button>
      )}
    </div>
  )
} */

export default ExpenseList