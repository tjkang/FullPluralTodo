import { createStore } from 'redux';

const defaultTodos = [
  {
    task: 'Initial todo in store',
    state: 'pending',
  },
];

const defaultState = {
  todos: defaultTodos,
  allTodos: defaultTodos,
  filter: 'pending', // 이런 string 은 실제 프로젝트에서는 constant(file에서 import한) 로 뺀다.
};

function todoStore(state = defaultState, action) {
    switch (action.type) {
      case 'ADD_TODO': {// 이런 string 은 실제 프로젝트에서는 constant 로 뺀다.
        const allTodos = state.allTodos.concat([{
          task: action.task,
          state: 'pending',
        }]);
        return Object.assign({}, state, {
          allTodos,
          todos: allTodos.filter(todo => todo.state === state.filter),
        });
      }
      case 'DONE_TODO': {
        const doneTodo = Object.assign({}, action.todo, {
          state: 'done',
        });

        const updatedAllTodos = state.allTodos.map((todo) => {
          if (todo === action.todo) {
            return doneTodo;
          }
          return todo;
        });

        return Object.assign({}, state, {
          allTodos: updatedAllTodos,
          todos: updatedAllTodos.filter(todo => todo.state === state.filter),
        });
      }
      case 'TOGGLE_STATE': {
          const filter = state.filter === 'pending' ? 'done' : 'pending';
          return Object.assign({}, state, {
            filter,
            todos: state.allTodos.filter(todo => todo.state === filter),
          });
        }
      default:
        return state;
    }
}

export default createStore(todoStore);
