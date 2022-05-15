import React from 'react';
import { useListContext } from '../context/ListContext';
import styles from '../styles.css';

export default function Header() {
  const { ACTIONS, list, dispatch } = useListContext();
  return (
    <header>
      <h2>My Shopping List</h2>
      <span>
        <p>Total items: {list.length}</p>
        <button onClick={() => dispatch({ type: ACTIONS.CLEAR_ITEMS })}>
          Clear Cart
        </button>
      </span>
    </header>
  );
}
