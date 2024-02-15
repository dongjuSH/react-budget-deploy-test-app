import { Component, useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [
        { id: 1, charge: '렌트비', amount: 1600 },
        { id: 2, charge: '교통비', amount: 400 },
        { id: 3, charge: '식비', amount: 1200 }
      ],
      charge: "",
      amount: 0,
      alert: { show: false, type: '', text: '' },
      id: "",
      edit: false
    }
  }

  handleCharge = (e) => {
    console.log(e.target.value);
    this.setState({
      charge: e.target.value
    })
  }

  handleAmount = (e) => {
    console.log(e.target.valueAsNumber);
    this.setState({
      amount: e.target.valueAsNumber
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.charge !== "" && this.state.amount > 0) {
      if (this.state.edit) {
        const newExpenses = this.state.expenses.map(item => {
          return item.id === this.state.id ? { ...item, charge: this.state.charge, amount: this.state.amount } : item
        })
        this.setState({
          expenses: newExpenses,
          edit: false
        });
        this.handleAlert({ type: 'success', text: '아이템이 수정되었습니다.' });
      } else {
        const newExpense = {
          id: crypto.randomUUID(),
          charge: this.state.charge,
          amount: this.state.amount
        }
        const newExpenses = [...this.state.expenses, newExpense];
        this.setState({
          expenses: newExpenses
        });
        this.handleAlert({ type: 'success', text: '아이템이 생성되었습니다.' });
      }
      this.setState({
        charge: "",
        amount: 0
      });
    } else {
      console.log('error');
      this.handleAlert({ type: 'danger', text: 'charge는 빈 값일 수 없으며 amount는 0보다 커야 합니다.' });
    }
  }

  handleDelete = (id) => {
    const newExpense = this.state.expenses.filter(expense => expense.id !== id);
    console.log(newExpense);
    this.setState({
      expenses: newExpense
    });
    this.handleAlert({ type: 'danger', text: '아이템이 삭제되었습니다.' });
  }

  handleAlert = ({ type, text }) => {
    this.setState({
      alert: { show: true, type: type, text: text }
    });
    setTimeout(() => {
      this.setState({
        alert: { show: false }
      });
    }, 7000);
  }

  handleEdit = (id) => {
    const expense = this.state.expenses.find(item => item.id === id);
    const { charge, amount } = expense;
    this.setState({
      id: id,
      charge: charge,
      amount: amount,
      edit: true
    });
  }

  clearItems = () => {
    this.setState({
      expenses: []
    })
  }

  render() {
    return (
      <main className='main-container'>
        {this.state.alert.show ? <Alert type={this.state.alert.type} text={this.state.alert.text} /> : null}
        <h1>예산 계산기</h1>
        <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
          <ExpenseForm
            handleCharge={this.handleCharge}
            charge={this.state.charge}
            handleAmount={this.handleAmount}
            amount={this.state.amount}
            handleSubmit={this.handleSubmit}
            edit={this.state.edit}
          />
        </div>
        <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
          <ExpenseList
            expenses={this.state.expenses}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            clearItems={this.clearItems}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'end', margin: '1rem 0 0' }}>
          <p style={{ fontSize: '2rem' }}>
            총지출:
            <span>
              {this.state.expenses.reduce((acc, curr) => {
                return (acc += curr.amount);
              }, 0)}
              원
            </span>
          </p>
        </div>
      </main>
    )
  }
}

/* const App = () => {
  const [expenses, setExpenses] = useState(
    [
      { id: 1, charge: '렌트비', amount: 1600 },
      { id: 2, charge: '교통비', amount: 400 },
      { id: 3, charge: '식비', amount: 1200 }
    ]
  );

  const [charge, setCharge] = useState("");

  const [amount, setAmount] = useState(0);

  const [alert, setAlert] = useState({ show: false });

  const [id, setId] = useState("");

  const [edit, setEdit] = useState(false);

  const handleCharge = (e) => {
    console.log(e.target.value);
    setCharge(e.target.value);
  }

  const handleAmount = (e) => {
    console.log(e.target.valueAsNumber);
    setAmount(e.target.valueAsNumber);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        const newExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item
        })
        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: '아이템이 수정되었습니다.' });
      } else {
        const newExpense = {
          id: crypto.randomUUID(),
          charge,
          amount
        }
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
        handleAlert({ type: 'success', text: '아이템이 생성되었습니다.' });
      }
      setCharge("");
      setAmount(0);
    } else {
      console.log('error');
      handleAlert({ type: 'danger', text: 'charge는 빈 값일 수 없으며 amount는 0보다 커야 합니다.' });
    }
  }

  const handleDelete = (id) => {
    const newExpense = expenses.filter(expense => expense.id !== id);
    console.log(newExpense);
    setExpenses(newExpense);
    handleAlert({ type: 'danger', text: '아이템이 삭제되었습니다.' });
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 7000);
  }

  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id);
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  }

  const clearItems = () => {
    setExpenses([]);
  }

  return (
    <main className='main-container'>
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>
      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        <ExpenseForm
          handleCharge={handleCharge}
          charge={charge}
          handleAmount={handleAmount}
          amount={amount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      </div>
      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'end', margin: '1rem 0 0' }}>
        <p style={{ fontSize: '2rem' }}>
          총지출 :
          <span>
            {expenses.reduce((acc, curr) => {
              return (acc += curr.amount);
            }, 0)}
            원
          </span>
        </p>
      </div>
    </main>
  )
} */

export default App;