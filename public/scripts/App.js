"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
require("./App.css");
var React = require("react");
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            todos: ['Implement the addTodo method', 'Implement the removeTodo method', 'Implement the clearCompletedTodos method',
                'Implement the removeAllTodos method', 'Implement the showHideCompletedTodso method', 'Implement the toggleTodoCompleteStatus method'],
            checkedTodos: [],
            completedBtn: 'Hide Completed',
            checked: false,
            value: undefined
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleHide = _this.handleHide.bind(_this);
        return _this;
    }
    // allows change of state in text box 
    Item.prototype.handleChange = function (event) {
        this.setState(event.target.value);
    };
    // handles the form submission and adds a todo to the task list
    Item.prototype.handleSubmit = function (event) {
        event.preventDefault();
        var form = event.currentTarget;
        var inputValue = form.elements["newTodo"].value;
        if (inputValue === '') {
            alert('Please enter a value into the text field');
        }
        else {
            this.setState({
                todos: this.state.todos.concat(inputValue)
            });
        }
    };
    Item.prototype.handleHide = function () {
        this.setState({
            checked: true
        });
    };
    Item.prototype.hideComplete = function () {
        this.clearCompleted(false);
        var checkedTodos = this.state.checkedTodos;
        var completedBtn = this.state.completedBtn;
        if (completedBtn === 'Show Completed') {
            var allTodos = [];
            var todos = this.state.todos;
            allTodos = todos.concat(checkedTodos);
            this.setState({ completedBtn: 'Hide Completed' });
            this.setState({ todos: allTodos });
        }
        else if (checkedTodos.length > 0) {
            this.setState({ completedBtn: 'Show Completed' });
        }
    };
    Item.prototype.removeTodo = function (event) {
        var todos = this.state.todos.filter(function (name) {
            return event !== name;
        });
        this.setState({ todos: todos });
    };
    Item.prototype.removeAll = function () {
        var todos = this.state.todos.filter(function (name, el) { return false; });
        var completed = this.state.checkedTodos.filter(function (name, el) {
            return false;
        });
        this.setState({ todos: todos });
        this.setState({ checkedTodos: completed });
    };
    Item.prototype.clearCompleted = function (remove) {
        var _this = this;
        var checkedTodos = this.state.checkedTodos;
        var todos = this.state.todos;
        document.querySelectorAll('input[type=checkbox]').forEach(function (el, i) {
            var _a, _b, _c;
            var toHide = (_a = el.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
            var labelParent = (_b = toHide) === null || _b === void 0 ? void 0 : _b.children[0];
            var labelValue = (_c = labelParent) === null || _c === void 0 ? void 0 : _c.children[1].innerHTML;
            if (_this.state.checked === true) {
                labelValue = document.getElementsByClassName(labelValue)[i].innerHTML;
                labelValue = labelValue.substring(1); // theres a weird whitespace at the start of labelValue this is to remove it
                checkedTodos.push(labelValue);
            }
            _this.setState({ checked: false });
        });
        var newTodos = todos.filter(function (todo) { return !checkedTodos.includes(todo); });
        if (remove === true) {
            var completed = this.state.checkedTodos.filter(function (name, el) {
                return false;
            });
            this.setState({ checkedTodos: completed });
        }
        this.setState({ todos: newTodos });
    };
    Item.prototype.getState = function (todo) {
        var currentState = String(this.state.todos.indexOf(todo));
        return currentState;
    };
    Item.prototype.render = function () {
        var _this = this;
        return (<React.Fragment>
        <div className="todoapp stack-large">
          <h1>Todo App with TypeScript and React</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="newTodo" className="input input__lg" name="newTodo" autoComplete="off" value={this.state.value} onChange={this.handleChange}/>
            <button type="submit" className="btn btn__primary btn__lg"> Add </button>
          </form>
          <div className="filters btn-group stack-exception">
            <button type="button" className="btn toggle-btn" aria-pressed="false" onClick={function () { _this.hideComplete(); }}>
              <span className="visually-hidden">Hide </span>
              <span className="btnLabel">{this.state.completedBtn}</span>
              <span className="visually-hidden"> tasks</span>
            </button>
            
            <button type="button" className="btn toggle-btn" aria-pressed="false" onClick={function () { _this.removeAll(); }}>
              <span className="visually-hidden">Show </span>
              <span>Remove All</span>
              <span className="visually-hidden"> tasks</span>
            </button>

            <button type="button" className="btn toggle-btn" aria-pressed="false" onClick={function () { _this.clearCompleted(true); }}>
              <span className="visually-hidden">Show </span>
              <span>Clear Completed</span>
              <span className="visually-hidden"> tasks</span>
            </button>
          </div>
          <h2 id="list-heading"> Tasks </h2>

          <ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
            {this.state.todos.map(function (todo) { return (<li className="todo stack-small" key={_this.state.todos.indexOf(todo)}>
                <div className="c-cb">
                  <input id={_this.getState(todo)} type="checkbox" onChange={_this.handleHide}/>
                  <label className="todo-label" htmlFor={_this.getState(todo)}> {todo}</label>
                </div>

                <div className="btn-group">
                  <button type="button" className="btn btn__danger" onClick={function () { _this.removeTodo(todo); }}>
                  Delete <span className="visually-hidden">{todo}</span>
                  </button>
                </div>
              </li>); })}
          </ul>
        </div>
      </React.Fragment>);
    };
    return Item;
}(React.Component));
function App() {
    return (<Item />);
}
exports["default"] = App;
