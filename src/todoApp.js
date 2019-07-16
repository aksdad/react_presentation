import React from "react";
import "./todo.css";

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
    document.getElementById("todoInputBox").value = "";
  }

  onInputChange(e) {
    this.setState({ currentText: e.target.value });
  }

  render() {
    return (
      <div className="todoInput">
        <input
          type="text"
          onChange={e => this.onInputChange(e)}
          id="todoInputBox"
          placeholder="Enter a new item here"
        />
        <button onClick={() => this.handleNewClick()}>+</button>
      </div>
    );
  }
}

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = { items: [] };
    this.handleOnClickNewItem = this.handleOnClickNewItem.bind(this);
  }

  handleOnClickNewItem(newItem) {
    this.setState({
      items: [...this.state.items, newItem]
    });
  }

  render() {
    return (
      <div className="todo">
        <TodoInput onClickNewItem={this.handleOnClickNewItem} />
        {this.state.items.map(item => {
          return <div className="todoItem">{item}</div>;
        })}
      </div>
    );
  }
}
