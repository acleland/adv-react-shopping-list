import { useReducer, useState } from 'react';

export default function App() {
  const ACTIONS = {
    ADD_ITEM: 'add-item',
  };

  function newItem(name) {
    return { id: Date.now(), name: name, complete: false };
  }

  function reducer(list, action) {
    switch (action.type) {
      case ACTIONS.ADD_ITEM:
        return [...list, newItem(action.payload.name)];
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
    </>
  );
}
