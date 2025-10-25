import { useReducer, useState } from "react";
import "./UseReducerHook.css";

type Todo = {
  id: number;
  text: string;
  isComplete: boolean;
};

const TODO_ACTIONS = {
  ADD_TODO: "ADD",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
} as const;

type ActionType =
  | {
      type: typeof TODO_ACTIONS.ADD_TODO;
      payload: { text: string };
    }
  | {
      type: typeof TODO_ACTIONS.TOGGLE;
      payload: { id: number };
    }
  | {
      type: typeof TODO_ACTIONS.DELETE;
      payload: { id: number };
    };

const initialTodos: Todo[] = [];

const todoReducer = (state: Todo[], action: ActionType): Todo[] => {
  switch (action.type) {
    case TODO_ACTIONS.ADD_TODO: {
      return [...state, newTodo(action.payload.text)];
    }

    case TODO_ACTIONS.TOGGLE: {
      return state.map((todoItem) => {
        if (todoItem.id === action.payload.id) {
          return { ...todoItem, isComplete: !todoItem.isComplete };
        }
        return todoItem;
      });
    }

    case TODO_ACTIONS.DELETE: {
      return state.filter((todoItem) => todoItem.id !== action.payload.id);
    }

    default: {
      return state;
    }
  }
};

function newTodo(text: string) {
  return {
    id: Date.now(),
    text,
    isComplete: false,
  };
}

const UseReducerHook = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [text, setText] = useState<string>("");

  const handleTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({
      type: TODO_ACTIONS.ADD_TODO,
      payload: { text: text.trim() },
    });
    setText("");
  };
  const handleToggle = (id: number) => {
    dispatch({ type: TODO_ACTIONS.TOGGLE, payload: { id } });
  };
  const handleDelete = (id: number) => {
    dispatch({ type: TODO_ACTIONS.DELETE, payload: { id } });
  };

  return (
    <section className="todo-list">
      <form className="todo-list__form" onSubmit={handleTodo}>
        <label htmlFor="text" className="form-label label">
          <input
            type="text"
            value={text}
            name="text"
            onChange={(e) => setText(e.target.value)}
            className="form-field field"
          />
        </label>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <article className="todos">
        {todos.length
          ? todos.map(({ text, isComplete, id }) => (
              <div key={id} className="todos-item">
                <h3
                  className={`${
                    isComplete ? "line-through" : ""
                  } todos-item-text`}
                >
                  {text}
                </h3>
                <div className="todos-controls">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleToggle(id)}
                  >
                    Toggle
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleDelete(id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          : null}
      </article>
    </section>
  );
};

export default UseReducerHook;
