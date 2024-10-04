import React from 'react';

import './todo-list-item.css';


const TodoListItem = ({ label, onDeleted,
                          onToggleImportant,
                          onToggleDone,
                          important, done }) => {

        let classNames = 'todo-list-item';
        if (done) {
            classNames += ' done';
        }

        if (important) {
            classNames += ' important';
        }

        return (
    <span className={classNames}>
        <span
                className="todo-list-item-label"
                onClick={onToggleDone}>
                {label}
        </span>
        <div className="containerForBtn">
            <button type="button"
                    className="btn btn-outline-danger btn-sm float-right btn-custom"
                    onClick={onDeleted}>
              <i className="fa fa-trash"/>
            </button>

            <button type="button"
                    className="btn-custom btn btn-outline-success btn-sm float-right"
                    onClick={onToggleImportant}>
                <i className="fa fa-exclamation"/>
            </button>
        </div>
    </span>
    );
};

export default TodoListItem;