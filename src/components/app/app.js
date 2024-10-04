import React, { useState, useRef } from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from '../item-add-form/item-add-form';

import './app.css';

const App = () => {
    const maxId = useRef(100);

    const creatTodoItem = (label) => {
        return {
            label,
            important: false,
            done: false,
            id: maxId.current++ // увеличиваем значение maxId при каждом создании элемента
        };
    };

    const [todoData, setTodoData] = useState([
        creatTodoItem('Drink Coffee'),
        creatTodoItem('Make Awesome App'),
        creatTodoItem('Have a lunch')
    ]);

    const [term, setTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const deleteItem = (id) => {
        setTodoData((todoData) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];
            return newArray;
        });
    };

    const addItem = (text) => {
        const newItem = creatTodoItem(text);
        setTodoData((todoData) => [...todoData, newItem]);
    };

    const toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };
        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    };

    const onToggleImportant = (id) => {
        setTodoData((todoData) => toggleProperty(todoData, id, 'important'));
    };

    const onToggleDone = (id) => {
        setTodoData((todoData) => toggleProperty(todoData, id, 'done'));
    };

    const onSearchChange = (term) => {
        setTerm(term);
    };

    const onFilterChange = (filter) => {
        setFilter(filter);
    };

    const search = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.toLowerCase().includes(term.toLowerCase());
        });
    };

    const filterItems = (items, filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    };

    const visibleItems = filterItems(search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
        <div className="todo-app">
            <AppHeader toDo={todoCount} done={doneCount} />
            <div className="top-panel d-flex">
                <SearchPanel onSearchChange={onSearchChange} />
                <ItemStatusFilter filter={filter} onFilterChange={onFilterChange} />
            </div>

            <TodoList
                todos={visibleItems}
                onDeleted={deleteItem}
                onToggleImportant={onToggleImportant}
                onToggleDone={onToggleDone}
            />

            <ItemAddForm onItemAdded={addItem} />
        </div>
    );
};

export default App;
