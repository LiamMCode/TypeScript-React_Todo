import './App.css';
import React, { Component } from 'react';

interface MyProps {
  todos: string[];
  checkedTodos: string[];
  completedBtn: string;
  checked: boolean;
  value: any;
}

class Item extends Component <any,MyProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: ['Implement the addTodo method', 'Implement the removeTodo method', 'Implement the clearCompletedTodos method', 
    'Implement the removeAllTodos method', 'Implement the showHideCompletedTodso method', 'Implement the toggleTodoCompleteStatus method'], 
      checkedTodos: [], 
      completedBtn: 'Hide Completed', 
      checked: false, 
      value: undefined
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }
  // allows change of state in text box 
  handleChange(event: any) {
    this.setState(event.target.value);
  }

  // handles the form submission and adds a todo to the task list
  handleSubmit(event: any) {
    event.preventDefault();
    const form = event.currentTarget;
    const inputValue = form.elements["newTodo"].value;
    if (inputValue === '') {
      alert('Please enter a value into the text field');
    }
    else {
      this.setState({
        todos: this.state.todos.concat(inputValue)
      })
    }
  }

  handleHide() {
    this.setState({
      checked: true
    });
  }

  hideComplete() {
    this.clearCompleted(false);
    const { checkedTodos } = this.state;
    let { completedBtn } = this.state;

    if (completedBtn === 'Show Completed') {
      let allTodos = [];
      const { todos } = this.state;

      allTodos = todos.concat(checkedTodos);
      this.setState({ completedBtn : 'Hide Completed'});
      this.setState({ todos : allTodos});
    }

    else if (checkedTodos.length > 0) {
      this.setState({ completedBtn : 'Show Completed'});
    }
  }

  removeTodo(event: string) {
    const todos = this.state.todos.filter((name: string) => {
      return event !== name;
    })
    this.setState({ todos })
  }

  removeAll() {
    const todos = this.state.todos.filter((name: string, el) => false);
    const completed = this.state.checkedTodos.filter((name: string, el) => {
      return false;
    })
    this.setState({ todos });
    this.setState({checkedTodos : completed});
  }


  clearCompleted(remove: boolean) {
    const { checkedTodos } = this.state;
    const { todos } = this.state;

    document.querySelectorAll('input[type=checkbox]').forEach((el, i) =>  {
      let toHide = el.parentElement?.parentElement;
      let labelParent = toHide?.children[0];
      let labelValue = labelParent?.children[1];

      if (el.checked === true) {
        labelValue = document.getElementsByClassName(labelValue.className)[i].innerHTML;
        labelValue = labelValue.substring(1); // theres a weird whitespace at the start of labelValue this is to remove it
        checkedTodos.push(labelValue);
      }
      el.checked = false;
    });
    const newTodos = todos.filter((todo: string) => !checkedTodos.includes(todo))

    if (remove === true) {
      const completed = this.state.checkedTodos.filter((name: string, el) => {
        return false;
      })
      this.setState({ checkedTodos: completed });
    }
    this.setState({ todos: newTodos });
  }

  render() {
    return (
      <React.Fragment>
        <div className="todoapp stack-large">
          <h1>Todo App</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="newTodo" className="input input__lg" name="newTodo" autoComplete="off" value={this.state.value} onChange={this.handleChange}/>
            <button type="submit" className="btn btn__primary btn__lg"> Add </button>
          </form>
          <div className="filters btn-group stack-exception">
            <button type="button" className="btn toggle-btn" aria-pressed="false" onClick={() => {this.hideComplete()}}>
              <span className="visually-hidden">Hide </span>
              <span className="btnLabel">{ this.state.completedBtn }</span>
              <span className="visually-hidden"> tasks</span>
            </button>
            
            <button type="button" className="btn toggle-btn" aria-pressed="false" onClick={() => {this.removeAll()}}>
              <span className="visually-hidden">Show </span>
              <span>Remove All</span>
              <span className="visually-hidden"> tasks</span>
            </button>

            <button type="button" className="btn toggle-btn" aria-pressed="false" onClick={() => {this.clearCompleted(true)}}>
              <span className="visually-hidden">Show </span>
              <span>Clear Completed</span>
              <span className="visually-hidden"> tasks</span>
            </button>
          </div>
          <h2 id="list-heading"> Tasks </h2>

          <ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
            {this.state.todos.map(todo => (
              <li className="todo stack-small" key={this.state.todos.indexOf(todo)}>
                <div className="c-cb">
                  <input id={this.state.todos.indexOf(todo)} type="checkbox" onChange={this.handleHide}/>
                  <label className="todo-label" htmlFor={this.state.todos.indexOf(todo)}> {todo}</label>
                </div>

                <div className="btn-group">
                  <button type="button" className="btn btn__danger" onClick={() => {this.removeTodo(todo)}}>
                  Delete <span className="visually-hidden">{todo}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    )
  }
}
function App() {
    return (
      <Item />
    )
  }  
export default App;