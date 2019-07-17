import React from "react";
import "./todo.css";


export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { items: [], keyCounter: 0 };
    this.handleOnClickNewItem = this.handleOnClickNewItem.bind(this);
  }
  
  handleOnClickNewItem(newItem) {
    const { keyCounter } = this.state;
    const newEl = <TodoItem text={newItem} key={keyCounter} />
    this.setState({
      items: [...this.state.items, newEl],
      keyCounter: keyCounter + 1,
    });
  }
  
  render() {
    return (
      <div className="todo">
        <TodoInput onClickNewItem={this.handleOnClickNewItem} />
        {this.state.items}
      </div>
    );
  }
}

class TodoItem extends React.Component {
  render() {
    const { text } = this.props;
    return (
      <div className="todoItem">
        <div className="todoCheckBox" />
        <span>{text}</span>
      </div>
    );
  }
}

class TodoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentText: "" };
  }

  handleNewClick() {
    const { onClickNewItem } = this.props;
    const { currentText } = this.state;
    if (currentText) {
      onClickNewItem(currentText);
    }
    this.setState({ currentText: "" });
  }

  onInputChange(e) {
    this.setState({ currentText: e.target.value });
  }

  render() {
    const { currentText } = this.state;
    return (
      <div className="todoInput">
        <input
          type="text"
          onChange={e => this.onInputChange(e)}
          id="todoInputBox"
          placeholder="Enter a new item here"
          value={currentText}
        />
        <button onClick={() => this.handleNewClick()}>+</button>
      </div>
    );
  }
}