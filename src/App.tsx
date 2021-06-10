import * as React from 'react';
import './css/App.css';

interface MyProps {
  todos: string[];
  checkedTodos: string[];
  completedBtn: string;
  checked: boolean[];
  checkedComplete: boolean[];
  value: any;
}

enum ToggleShowHide {
  show = 'Show Completed',
  hide = 'Hide Completed',
  emptyInput = 'Please enter a value into the text field',
  duplicateInput = 'This Todo is already in the Task List, please enter a new Todo',
}

class Item extends React.Component <any, MyProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: ['Implement the addTodo method', 'Implement the removeTodo method', 'Implement the clearCompletedTodos method',
        'Implement the removeAllTodos method', 'Implement the showHideCompletedTodso method', 'Implement the toggleTodoCompleteStatus method'],
      checkedTodos: [],
      completedBtn: ToggleShowHide.hide,
      checked: [false, false, false, false, false, false],
      checkedComplete: [false, false, false, false, false, false],
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  // allows change of state in text box
  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }

  // handles the form submission and adds a todo to the task list
  handleSubmit(event: any) {
    const { todos, checked } = this.state;

    event.preventDefault();
    const form = event.currentTarget;
    const inputValue = form.elements.newTodo.value;

    if (inputValue === '') {
      alert(ToggleShowHide.emptyInput);
    } 
    else {
      const newTodos = todos.concat(inputValue);
      if (todos.includes(inputValue)) {
        alert(ToggleShowHide.duplicateInput);
      }
      if (!todos.includes(inputValue)) {
        const newChecked = checked.concat(false);
        this.setState({
          todos: newTodos,
          checked: newChecked,
          value: '',
        });
      }
    }
  }

  handleHide(todoToHide: string) {
    const { checked, todos } = this.state;
    const indexOfTodo = todos.indexOf(todoToHide);

    const newChecked: boolean[] = checked;
    if (newChecked[indexOfTodo] === true) {
      newChecked[indexOfTodo] = false;
    } 
    else {
      newChecked[indexOfTodo] = true;
    }
    this.setState({ checked: newChecked });
  }

  getState(todo: string) {
    const { todos } = this.state;
    const currentState: string = String(todos.indexOf(todo));
    return currentState;
  }

  hideComplete() {
    const {
      checkedTodos,
      completedBtn,
      checked,
      checkedComplete,
      todos,
    } = this.state;

    if (completedBtn === ToggleShowHide.show) {
      let allTodos: string[] = [];
      allTodos = todos.concat(checkedTodos);
      checkedComplete.splice(0,checkedTodos.length);
      document.querySelectorAll('input[type=checkbox]').forEach((el, i) => {
        if (checked[i] === true) {
          (document.getElementById(i.toString()) as HTMLInputElement).checked = true;
        }
      });
      this.clearCompleted(true);
      this.setState({ completedBtn: ToggleShowHide.hide, todos: allTodos });
    } 
    else if (completedBtn === ToggleShowHide.hide) {
      this.clearCompleted(false);
      this.setState({ checked: checkedComplete, completedBtn: ToggleShowHide.show });
    }
    console.log(checked, checkedComplete);
  }

  removeTodo(event: string) {
    const { todos } = this.state;
    const todosNew = todos.filter((name: string) => event !== name);
    this.setState({ todos: todosNew });
  }

  removeAll() {
    const { todos, checkedTodos } = this.state;
    const todosNew = todos.filter(() => false);
    const completed = checkedTodos.filter(() => false);
    this.setState({ todos: todosNew, checkedTodos: completed });
  }

  clearCompleted(remove: boolean) {
    const { checkedTodos,todos,checked, checkedComplete } = this.state;

    document.querySelectorAll('input[type=checkbox]').forEach((el, i) => {
      const toHide = el.parentElement.parentElement.children[0];

      if (checked[i] === true) {
        const labelValue = (toHide.children[1].innerHTML);
        checkedTodos.push(labelValue);
      }
      (document.getElementById(i.toString()) as HTMLInputElement).checked = false;
    });
    console.log(checkedComplete, checked);
    const newTodos = todos.filter((todo: string) => !checkedTodos.includes(todo));

    if (remove === true) {
      const completed: string[] = checkedTodos.filter(() => true);
      this.setState({ checked: checkedComplete, checkedTodos: completed });
    }
    this.setState({ todos: newTodos });
  //   while (checked.length > todos.length) {
  //     checked.pop();
  //   }
  //   while (checkedComplete.length > todos.length) {
  //    checkedComplete.pop();
  //  }
  //   while (checked.length && checkedComplete.length < (todos.length)) {
  //     checked.push(true);
  //     checkedComplete.push(true);
  //   }

    for (let i = 0; i < todos.length; i++) {
      if (checked[i] === true) {
        (document.getElementById(i.toString()) as HTMLInputElement).checked = true;
      }
      else {
        (document.getElementById(i.toString()) as HTMLInputElement).checked = false;
      }
    }
   console.log(checked, checkedComplete);
  }

  render() {
    const {
      value,
      completedBtn,
      todos,
    } = this.state;
    return (
      <>
        <div className="todoapp stack-large">
          <h1>Todo App with TypeScript and React</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="newTodo" className="input input__lg" name="newTodo" autoComplete="off" value={value} onChange={this.handleChange} />
            <button type="submit" className="btn btn__primary btn__lg"> Add Todo </button>
          </form>
          <div className="filters btn-group stack-exception">
            <button type="button" className="btn toggle-btn" aria-pressed="false" onClick={() => { this.hideComplete(); }}>
              <span className="visually-hidden"> Hide/Show completed </span>
              <span className="btnLabel">{ completedBtn }</span>
              <span className="visually-hidden"> tasks</span>
            </button>

            <button type="button" className="btn toggle-btn" aria-pressed="false" onClick={() => { this.removeAll(); }}>
              <span className="visually-hidden"> Remove All </span>
              <span>Remove All</span>
              <span className="visually-hidden"> tasks</span>
            </button>

            <button type="button" className="btn toggle-btn" aria-pressed="false" onClick={() => { this.clearCompleted(true); }}>
              <span className="visually-hidden"> Clear Completed </span>
              <span>Clear Completed</span>
              <span className="visually-hidden"> tasks</span>
            </button>
          </div>
          <h2 id="list-heading"> Tasks </h2>

          <ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
            {todos.map((todo) => (
              <li className="todo stack-small" key={todos.indexOf(todo)}>
                <div className="c-cb">
                  <input id={this.getState(todo)} type="checkbox" onChange={() => { this.handleHide(todo); }} />
                  <label className="todo-label" htmlFor={this.getState(todo)}>
                    {todo}
                  </label>
                </div>

                <div className="btn-group">
                  <button type="button" className="btn btn__danger" onClick={() => { this.removeTodo(todo); }}>
                    Delete
                    <span className="visually-hidden">{todo}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
export default Item;
