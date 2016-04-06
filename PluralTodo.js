import React from 'react-native';
const {
  Component,
  Navigator,
} = React;

import TaskList from './TaskList';
import TaskForm from './TaskForm';

class PluralTodo extends Component {
  constructor(props, context) {
    super(props, context);
    // this.renderScene = this.renderScene.bind(this);
    // this.onAddStarted = this.onAddStarted.bind(this);

    this.state = {
      todos: [
        {
          task: 'Learn React Native',
        },
        {
          task: 'Learn Redux',
        },
      ],
    };
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
    this.state.todos.push({ task });
    this.setState({ todos: this.state.todos });
    this.refs.nav.pop();
  }

  onDone(todo) {
    console.log('task was completed:', todo.task);
    const filteredTodos =
      this.state.todos.filter((filterTodo) => {
        const res = (filterTodo !== todo);
        return res;
      });
    this.setState({ todos: filteredTodos });
  }

  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottom;
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
            onAddStarted={this.onAddStarted.bind(this)}
            onDone={this.onDone.bind(this)}
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
