import React from 'react'

export interface TodoData {
    title: string,
    id: number,
    checked: boolean,
}

interface TodoProps {
    todo: TodoData,
    deleteTodo: (id: number) => void,
    toggleChecked: (id: number) => void,
}

export const Todo = (props: TodoProps) => {
    const { id, title, checked} = props.todo;
    return (
        <>
            <li className="todo stack-small" key={id}>
                <div className="c-cb">
                    <input id={id.toString()} type="checkbox" checked={checked} onChange={() => props.toggleChecked(id)}/>
                    <label className="todo-label" >
                        {title}
                    </label>
                </div>

                <div className="btn-group">
                    <button type="button" className="btn btn__danger" onClick={() => props.deleteTodo(id)}>
                        Delete
                        <span className="visually-hidden">{title}</span>
                    </button>
                </div>
            </li>
        </>
    )
}