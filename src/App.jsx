import { useReducer, useState } from 'react';
import ListItem from './components/ListItem';
import { useListContext } from './context/ListContext';

export default function App() {
  const { ACTIONS, list, dispatch } = useListContext();

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
            <ListItem item={listItem} />
          </li>
        ))}
      </ul>
    </>
  );
}
