import { type FormEvent, useReducer, useRef, useState } from 'react';
import './UseReducerHook.css';

const TODO_ACTION_TYPE = {
	CREATE: 'CREATE',
	UPDATE: 'UPDATE',
	REMOVE: 'REMOVE',
	CLEAR: 'CLEAR',
} as const;

type TodoType = {
	id: string;
	todoTitle: string;
};

type TodoActionType =
	| {
			type: typeof TODO_ACTION_TYPE.CREATE;
			payload: { todoTitle: string };
	  }
	| {
			type: typeof TODO_ACTION_TYPE.UPDATE;
			payload: { id: string; todoTitle: string };
	  }
	| {
			type: typeof TODO_ACTION_TYPE.REMOVE;
			payload: { id: string };
	  }
	| {
			type: typeof TODO_ACTION_TYPE.CLEAR;
	  };

const initialTodo: TodoType[] = [];

const todoReducer = (state: TodoType[], action: TodoActionType): TodoType[] => {
	switch (action.type) {
		case TODO_ACTION_TYPE.CREATE: {
			const { todoTitle } = action.payload;
			if (!todoTitle.trim()) return state;

			const newTodo = { id: crypto.randomUUID() as string, todoTitle };
			return [...state, newTodo];
		}
		case TODO_ACTION_TYPE.UPDATE: {
			const { id, todoTitle } = action.payload;

			return state.map((todo) => {
				return todo.id === id ? { ...todo, todoTitle } : todo;
			});
		}
		case TODO_ACTION_TYPE.REMOVE: {
			const { id } = action.payload;
			return state.filter((todo) => todo.id !== id);
		}
		case TODO_ACTION_TYPE.CLEAR: {
			return [];
		}
		default: {
			return state;
		}
	}
};

const UseReducerHook: React.FC = () => {
	const [todoTitle, setTodoTitle] = useState('');
	const [state, dispatch] = useReducer(todoReducer, initialTodo);
	const elementRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const todoId = elementRef.current?.dataset.id;

		if (todoId) {
			dispatch({
				type: TODO_ACTION_TYPE.UPDATE,
				payload: { id: todoId, todoTitle },
			});
			delete elementRef.current?.dataset.id;
		} else {
			dispatch({ type: TODO_ACTION_TYPE.CREATE, payload: { todoTitle } });
		}

		setTodoTitle('');
	};

	const handleUpdateTodo = (todo: TodoType) => {
		if (!elementRef.current) return;
		elementRef.current.dataset.id = todo.id;
		elementRef.current.focus();
		setTodoTitle(todo.todoTitle);
	};

	return (
		<section>
			<form className="input-group" onSubmit={handleSubmit}>
				<label htmlFor="todo">
					Create a TODO :{' '}
					<input
						ref={elementRef}
						type="text"
						name="todo"
						id="todo"
						value={todoTitle}
						onChange={(e) => setTodoTitle(e.target.value)}
					/>
				</label>
				<button type="submit" className="btn">
					Submit
				</button>
			</form>
			<div className="todos">
				{state.length > 0
					? state.map((todo) => (
							<div key={todo.id} className="todo-item">
								<p>{todo.todoTitle}</p>
								<div className="todo-controls">
									<button
										type="button"
										className="btn"
										onClick={() => handleUpdateTodo(todo)}
									>
										Update
									</button>
									<button
										type="button"
										className="btn"
										onClick={() =>
											dispatch({
												type: TODO_ACTION_TYPE.REMOVE,
												payload: { id: todo.id },
											})
										}
									>
										Remove
									</button>
								</div>
							</div>
						))
					: null}
			</div>
			{state.length > 0 && (
				<button
					type="button"
					className="btn"
					onClick={() => dispatch({ type: TODO_ACTION_TYPE.CLEAR })}
				>
					Clear Todo
				</button>
			)}
		</section>
	);
};

export default UseReducerHook;
