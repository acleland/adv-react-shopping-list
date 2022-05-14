import { createContext, useContext, useReducer, useEffect } from 'react';

const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const testVar = 'helloooo';

  const ACTIONS = {
    ADD_ITEM: 'add-item',
    TOGGLE_ITEM: 'toggle-item',
    DELETE_ITEM: 'delete-item',
    EDIT_ITEM: 'edit-item',
    CLEAR_ITEMS: 'clear-items',
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
      case ACTIONS.CLEAR_ITEMS:
        return [];
      default:
        throw new Error('Error in reducer');
    }
  }

  const [list, dispatch] = useReducer(reducer, [], () => {
    const saved = localStorage.getItem('list');
    const savedList = JSON.parse(saved);
    return savedList || [];
  });

  // Save list to local storage when list updates
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

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
