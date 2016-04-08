import React from 'react-native';
const {
  Component,
  Navigator,
} = React;

import TaskList from './TaskList';
import TaskForm from './TaskForm';
import store from './todoStore';

class PluralTodo extends Component {
  constructor(props, context) {
    super(props, context);
    // this.renderScene = this.renderScene.bind(this);
    // this.onAddStarted = this.onAddStarted.bind(this);

    this.state = store.getState();

    store.subscribe(() => {
      this.setState(store.getState()); // eslint-disable-line react/no-set-state
    });
  }

  onAddStarted() {
    this.refs.nav.push({
      name: 'taskform',
    });
  }

  onCancel() {
    console.log('canceled!');
    this.refs.nav.pop();
  }

  onAdd(task) {
    console.log('a task was added: ', task);

    // without redux
    // this.state.todos.push({ task });
    // this.setState({ todos: this.state.todos });

    // with redux
    store.dispatch({
      type: 'ADD_TODO',
      task,
    });

    this.refs.nav.pop();
  }

  onDone(todo) {
    console.log('task was completed:', todo.task);
    store.dispatch({
      type: 'DONE_TODO',
      todo,
    });
  }

  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  onToggle() {
    store.dispatch({
      type: 'TOGGLE_STATE',
    });
  }

  renderScene(route, nav) {
    switch (route.name) {
      case 'taskform':
        return (
          <TaskForm
            onAdd={this.onAdd.bind(this)}
            onCancel={this.onCancel.bind(this)}
          />
        );
      default:
        return (
          <TaskList
            filter={this.state.filter}
            onAddStarted={this.onAddStarted.bind(this)}
            onDone={this.onDone.bind(this)}
            onToggle={this.onToggle.bind(this)}
            todos={this.state.todos}
          />
      );
    }
  }

  render() {
    return (
      <Navigator
        configureScene={this.configureScene}
        initialRoute={{ name: 'tasklist', index: 0 }}
        ref="nav"
        renderScene={ this.renderScene.bind(this) }
      />
    );
  }
}

export default PluralTodo;
