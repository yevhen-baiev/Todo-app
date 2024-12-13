import { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodoContext';
import { ErrorTypes } from '../../types/ErrorTypes';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, completed, title } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    deleteTodo,
    tempTodoIds,
    updateTodo,
    setError,
    isEditingId,
    setIsEditingId,
  } = useContext(TodosContext);

  const onDoubleClick = () => {
    if (!isEditingId) {
      setIsEditing(true);
      setIsEditingId(id);
    }
  };

  const handleToggleChange = () => {
    const newTodo = { ...todo, completed: !completed };

    updateTodo(newTodo).catch(() => setError(ErrorTypes.Update));
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing, setIsEditing]);

  const handleOnEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setIsEditingId(null);
      setNewTitle(title);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const aditFunc = (str: string) => {
    setError(ErrorTypes.Initial);

    const trimmedTitle = str.trim();

    if (!trimmedTitle) {
      deleteTodo(id);
      setIsEditing(false);
      setNewTitle(title);
      setIsEditingId(null);

      return;
    }

    if (trimmedTitle === title) {
      setNewTitle(trimmedTitle);
      setIsEditing(false);
      setIsEditingId(null);

      return;
    }

    const todoUpdated = { ...todo, title: trimmedTitle };

    updateTodo(todoUpdated)
      .then(() => {
        setIsEditing(false);
        setIsEditingId(null);
      })
      .catch(() => {
        setIsEditing(true);
        setError(ErrorTypes.Update);
      });

    setNewTitle(trimmedTitle);
  };

  const handleOnBlur = () => {
    aditFunc(newTitle);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    aditFunc(newTitle);
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed })}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleToggleChange}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={handleOnChange}
            onKeyUp={handleOnEscape}
            onBlur={handleOnBlur}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => onDoubleClick()}
          >
            {newTitle}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(id)}
          >
            ×
          </button>
        </>
      )}

      {/* overlay will cover the todo while it is being updated */}
      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': tempTodoIds.includes(id),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
