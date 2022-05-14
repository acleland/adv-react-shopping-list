import { createContext, useContext, useReducer } from 'react';

const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const testVar = 'helloooo';

  const ACTIONS = {
    ADD_ITEM: 'add-item',
    TOGGLE_ITEM: 'toggle-item',
    DELETE_ITEM: 'delete-item',
    EDIT_ITEM: 'edit-item',
  };

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
      case ACTIONS.DELETE_ITEM:
        return list.filter((item) => item.id !== action.payload.id);
      case ACTIONS.EDIT_ITEM:
        return list.map((item) =>
          item.id === action.payload.id
            ? { ...item, name: action.payload.name }
            : item
        );
      default:
        throw new Error('Error in reducer');
    }
  }

  const [list, dispatch] = useReducer(reducer, []);

  return (
    <ListContext.Provider value={{ ACTIONS, list, dispatch }}>
      {children}
    </ListContext.Provider>
  );
};

export const useListContext = () => {
  const context = useContext(ListContext);
  if (context === undefined) {
    throw new Error('useListContext must be used within a ListProvider');
  }
  return context;
};
