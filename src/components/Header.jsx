import React from 'react';
import { useListContext } from '../context/ListContext';

export default function Header() {
  const { list } = useListContext();
  return (
    <div>
      <h2>My Shopping List</h2>
      <p>Total items: {list.length}</p>
    </div>
  );
}
