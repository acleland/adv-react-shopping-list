import { useReducer, useState } from 'react';
import ListItem from './components/ListItem';

export const ACTIONS = {
  ADD_ITEM: 'add-item',
  TOGGLE_ITEM: 'toggle-item',
};

export default function App() {
  function newItem(name) {
    return { id: Date.now(), name: name, complete: false };
  }

  function reducer(list, action) {
    switch (action.type) {
      case ACTIONS.ADD_ITEM:
        return [...list, newItem(action.payload.name)];
      case ACTIONS.TOGGLE_ITEM:
        return list.map((item) =>
          item.id === action.payload.id
            ? { ...item, complete: !item.complete }
            : item
        );
    }
  }

  const [list, dispatch] = useReducer(reducer, []);
  const [item, setItem] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_ITEM, payload: { name: item } });
    setItem('');
  }

  return (
    <>
      <h1>Shopping List</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={item}
          type="text"
          onChange={(e) => {
            setItem(e.target.value);
          }}
          placeholder="Enter item"
        />
        <button>Add item</button>
      </form>
      <ul>
        {list.map((listItem) => (
          <li key={listItem.id}>
            <ListItem item={listItem} dispatch={dispatch} />
          </li>
        ))}
      </ul>
    </>
  );
}
