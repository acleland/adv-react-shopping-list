import React from 'react';
import { useListContext } from '../context/ListContext';

export default function Header() {
  const { ACTIONS, list, dispatch } = useListContext();
  return (
    <div>
      <h2>My Shopping List</h2>
      <p>Total items: {list.length}</p>
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR_ITEMS })}>
        Clear Cart
      </button>
    </div>
  );
}
