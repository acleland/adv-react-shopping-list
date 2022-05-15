import React from 'react';
import { useListContext } from '../context/ListContext';

import { useState } from 'react';
import styles from '../styles.css';

export default function ListItem({ item }) {
  const { ACTIONS, dispatch } = useListContext();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(item.name);

  const handleToggle = () => {
    dispatch({ type: ACTIONS.TOGGLE_ITEM, payload: { id: item.id } });
  };

  const handleDelete = () => {
    dispatch({ type: ACTIONS.DELETE_ITEM, payload: { id: item.id } });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.EDIT_ITEM, payload: { id: item.id, name: name } });
    setEditing(false);
  };

  return (
    <span>
      {editing ? (
        <form onSubmit={handleEdit}>
          <input
            type="text"
            placeholder={item.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button>Save</button>
        </form>
      ) : (
        <>
          <input
            type="checkbox"
            id={item.id}
            checked={item.complete}
            onChange={handleToggle}
          />
          <label
            htmlFor={item.id}
            className={item.complete ? `${styles.checked}` : ''}
          >
            {item.name}
          </label>
          <button onClick={() => setEditing(!editing)}>Edit</button>
        </>
      )}
      <button onClick={handleDelete}>Delete</button>
    </span>
  );
}
