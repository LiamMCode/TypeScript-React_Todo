import * as React from 'react';
import { Todo, TodoData } from'./todo'
import './css/App.css';

interface MyProps {
  todos: TodoData[];
  showCompleted: boolean;
  value: any;
}

enum ToggleShowHide {
  emptyInput = 'Please enter a value into the text field',
  duplicateInput = 'This Todo is already in the Task List, please enter a new Todo',
}

class Item extends React.Component <any, MyProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      todos: [
        {
          id: 0,
          title: 'Implement the addTodo method',
          checked: false,
        },
        {
          id: 1,
          title: 'Implement the removeTodo method',
          checked: false,
        }, 
        {
          id: 2, 
          title: 'Implement the clearCompletedTodos method',
          checked: false,
        },
        {
          id: 3, 
          title: 'Implement the removeAllTodos method',
          checked: false,
        },
        {
          id: 4, 
          title: 'Implement the showHideCompletedTodso method',
          checked: false,
        },
        {
          id: 5, 
          title: 'Implement the toggleTodoCompleteStatus method',
          checked: false,
        },
    ],
      value: '',
      showCompleted: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // allows change of state in text box
  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }

  // handles the form submission and adds a todo to the task list
  handleSubmit(event: any) {
    event.preventDefault();
    const inputValue = this.state.value;
    let duplicate = false;
    if (inputValue === '') {
      alert(ToggleShowHide.emptyInput);
    } 
    else {
      this.state.todos.forEach((todo) => {
        if (todo.title === inputValue) {
          alert(ToggleShowHide.duplicateInput);
          duplicate = true;
        }
      });
      if (!duplicate) {
        this.setState({
          todos: [...this.state.todos, {
            id: this.state.todos.length,
            title: inputValue,
            checked: false,
          }], 
          value: '',
        })
      }
    }
  }

  toggleChecked = (id: number): void => {
    this.state.todos.forEach((todo) => {
      if (todo.id === id) {
        todo.checked = !todo.checked;
      }
    });

    this.setState({
      todos: this.state.todos,
    })

  }
  
  hideComplete() {
    this.setState({
     showCompleted: !this.state.showCompleted
    });
  }

  removeTodo = (id: number): void => {
    const newTodos = this.state.todos.filter((todo) => {
        return todo.id != id;
    });
    this.setState({
      todos: newTodos,
    });
  }

  removeAll() {
    this.setState({
      todos: [],
    });
  }

  clearCompleted() {
    const clear = this.state.todos.filter((todo) => {
      if (!todo.checked) {
        return todo;
      }
    });
    this.setState({ todos: clear });
  }

  render() {
    const {
      value,
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
              <span className="btnLabel">{this.state.showCompleted ? 'Hide completed' : 'Show Completed'}</span>
              <span className="visually-hidden"> tasks</span>
            </button>

            <button type="button" className="btn toggle-btn" aria-pressed="false" onClick={() => { this.removeAll(); }}>
              <span className="visually-hidden"> Remove All </span>
              <span>Remove All</span>
              <span className="visually-hidden"> tasks</span>
            </button>

            <button type="button" className="btn toggle-btn" aria-pressed="false" onClick={() => { this.clearCompleted(); }}>
              <span className="visually-hidden"> Clear Completed </span>
              <span>Clear Completed</span>
              <span className="visually-hidden"> tasks</span>
            </button>
          </div>
          <h2 id="list-heading"> Tasks </h2>

          <ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
            {todos.map((todo) => (
               !(!this.state.showCompleted && todo.checked) 
               && <Todo 
                    key={todo.id} 
                    todo={todo} 
                    deleteTodo={this.removeTodo} 
                    toggleChecked={this.toggleChecked}
                  />
            ))}
          </ul>
        </div>
      </>
    );
  }
}
export default Item;