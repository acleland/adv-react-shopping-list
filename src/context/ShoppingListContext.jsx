import { createContext, useContext, useReducer } from 'react';

ShoppingListContext = createContext();

const ShoppingListProvider = ({ children }) => {};
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
