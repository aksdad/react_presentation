import React from "react";
import "./todo.css";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const deleteFunc = this.props.deleteItem;
    const { id } = this.props;
    deleteFunc(id);
  }

  render() {
    const {text} = this.props;

    return <div className="todoItem" onClick={() => this.handleDelete()}>{text}</div>;
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
    return (
      <div className="todoInput">
        <input
          type="text"
          onChange={e => this.onInputChange(e)}
          id="todoInputBox"
          placeholder="Enter a new item here"
          value={this.state.currentText}
        />
        <button onClick={() => this.handleNewClick()}>+</button>
      </div>
    );
  }
}

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = { items: [], keyCounter: 0 };
    this.handleOnClickNewItem = this.handleOnClickNewItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleOnClickNewItem(newItem) {
    const {keyCounter} = this.state;
    const el = <TodoItem text={newItem} deleteItem={this.deleteItem} key={keyCounter} id={keyCounter}/>;
    this.setState({
      items: [...this.state.items, el],
      keyCounter: keyCounter + 1
    });
  }

  deleteItem(item) {
    const items = this.state.items;
    this.setState({
      items: items.filter((x) => x.props.id !== item),
    })
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
