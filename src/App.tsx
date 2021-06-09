import './css/App.css';
import * as React from 'react';

interface MyProps {
  todos: string[];
  checkedTodos: string[];
  completedBtn: string;
  checked: boolean[];
  checkedComplete: boolean[];
  value: any;
}

class Item extends React.Component <any, MyProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: ['Implement the addTodo method', 'Implement the removeTodo method', 'Implement the clearCompletedTodos method', 
    'Implement the removeAllTodos method', 'Implement the showHideCompletedTodso method', 'Implement the toggleTodoCompleteStatus method'], 
      checkedTodos: [], 
      completedBtn: 'Hide Completed', 
      checked: [false, false, false, false, false, false], 
      checkedComplete: [],
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }
  // allows change of state in text box 
  handleChange(event: any) {
    const { value } = this.state;
    this.setState({value : event.target.value});
  }

  // handles the form submission and adds a todo to the task list
  handleSubmit(event: any) {
    const { todos, checked } = this.state;

    event.preventDefault();
    const form = event.currentTarget;
    const inputValue = form.elements["newTodo"].value;
    if (inputValue === '') {
      alert('Please enter a value into the text field');
    }
    else {
      const newTodos = todos.concat(inputValue);
      if (todos.includes(inputValue)) {
        alert('This Todo is already in the Task List, please enter a new Todo')
      }
      if (!todos.includes(inputValue)) {
        const newChecked = checked.concat(false);
        this.setState({
          todos: newTodos, 
          checked: newChecked
        })
      }
    }
  }

  handleHide(todoToHide: string) {
    const { checked, todos } = this.state;

    const indexOfTodo = todos.indexOf(todoToHide);

    let newChecked: boolean[] = checked;
    if (newChecked[indexOfTodo] === true) {
      newChecked[indexOfTodo] = false;
    }
    else {
      newChecked[indexOfTodo] = true
    }
    this.setState({checked : newChecked});
  }

  hideComplete() {
    const { checkedTodos, completedBtn, checked, checkedComplete, todos } = this.state;

    if (completedBtn === 'Show Completed') {
      let allTodos = [];
      let allChecked: boolean[] = [];
      allTodos = todos.concat(checkedTodos);
      allChecked = checked.concat(checkedComplete);
      this.setState({ completedBtn : 'Hide Completed', todos : allTodos, checked : allChecked});
    }

    else if (completedBtn === 'Hide Completed') {
      this.clearCompleted(false);
      const newChecked = checked.filter((checks: boolean = true) => !checkedComplete.includes(checks));
      this.setState({ checked: newChecked, completedBtn: 'Show Completed' });
    }
  }

  removeTodo(event: string) {
    const { todos } = this.state;
    const todosNew = todos.filter((name: string) => {
      return event !== name;
    })
    this.setState({ todos : todosNew })
  }

  removeAll() {
    const { todos, checkedTodos } = this.state;

    const todosNew = todos.filter((name: string, el) => false);
    const completed = checkedTodos.filter((name: string, el) => {
      return false;
    })
    this.setState({ todos : todosNew, checkedTodos : completed});
  }

  clearCompleted(remove: boolean) {
    const { checkedTodos, todos, checked, checkedComplete } = this.state;

    document.querySelectorAll('input[type=checkbox]').forEach((el, i) =>  {
      let toHide = el.parentElement.parentElement;
      let labelParent = toHide.children[0];

      if (checked[i] === true) { 
        let labelValue = labelParent.children[1].innerHTML;
        console.log(labelValue);
        labelValue = labelValue.substring(1); // theres a weird whitespace at the start of labelValue this is to remove it
        checkedTodos.push(labelValue);
        checkedComplete.push(checked[i]);
      }
      (document.getElementById(i.toString()) as HTMLInputElement).checked = false;
    });
    const newTodos = todos.filter((todo: string) => !checkedTodos.includes(todo));
    const newChecked = checked.filter((checks: boolean) => !checkedComplete.includes(true));

    if (remove === true) {
      const completed = checkedTodos.filter((name: string, el) => {
        return false;
      })
      this.setState({ checked : newChecked, checkedTodos: completed });

      const completedChecks = checkedComplete.filter((name: boolean, el) => {
        return false;
      })
      this.setState({ checkedComplete: completedChecks });
    }
    this.setState({ todos: newTodos });
  }

  getState(todo: string) {
    const { todos } = this.state;
    let currentState: string = String(todos.indexOf(todo));
    return currentState;
  }
  render() {
    return (
      <React.Fragment>
        <div className="todoapp stack-large">
          <h1>Todo App with TypeScript and React</h1>
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
                  <input id={this.getState(todo)} type="checkbox" onChange={() => {this.handleHide(todo)}}/>
                  <label className="todo-label" htmlFor={this.getState(todo)}> {todo}</label>
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