import React, { Component } from 'react'
import "antd/dist/antd.css"
import store from './store'
import { getInputChangeAction, getAddItemAction, getDeleteItemAction, initListAction} from './store/actionCreators'
import TodoListUI from './TodoListUI'
import axios from 'axios'


class TodoList extends Component {

  constructor(props) {
    super(props)
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
    store.subscribe(this.handleStoreChange)
  }

  render() {
    return (
      <TodoListUI 
        inputValue={this.state.inputValue}
        handleInputChange={this.handleInputChange}
        handleButtonClick={this.handleButtonClick}
        list={this.state.list}
        handleItemDelete={this.handleItemDelete}
      />
    )
  }

  componentDidMount() {
    axios.get('/list.json').then((res) => {
      const data = res.data
      store.dispatch(initListAction(data))
    })
  }

  handleInputChange(e) {
    const action = getInputChangeAction(e.target.value)
    store.dispatch(action)
  }

  handleStoreChange() {
    this.setState(store.getState())
  }

  handleButtonClick() {
    store.dispatch(getAddItemAction())
  }

  handleItemDelete(index) {
    store.dispatch(getDeleteItemAction(index))
  }
}

export default TodoList