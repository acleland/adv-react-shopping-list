import React from 'react';
import { ACTIONS } from '../App';

export default function ListItem({ item, dispatch }) {
  const handleToggle = () => {
    dispatch({ type: ACTIONS.TOGGLE_ITEM, payload: { id: item.id } });
  };
  const handleDelete = () => {
    dispatch({ type: ACTIONS.DELETE_ITEM, payload: { id: item.id } });
  };
  return (
    <span>
      <input
        type="checkbox"
        id={item.id}
        checked={item.complete}
        onChange={handleToggle}
      />
      <label htmlFor={item.id}>{item.name}</label>
      <button onClick={handleDelete}>Delete</button>
    </span>
  );
}
