// CartContext.js
import React, { createContext, useContext, useReducer, useMemo } from 'react';

const CartContext = createContext();

/* ─────────────────────────  Reducer  ───────────────────────── */

function cartReducer(state, action) {
  switch (action.type) {
    /* ----------  ADD  ---------- */
    case 'ADD': {
      const { payload } = action; // { productId, size, thickness, qty, ... }
      const key = `${payload.productId}-${payload.size}-${payload.thickness}`;

      // merge with existing line (same product‑size‑thickness)
      const prev = state[key] || {};
      const nextQty = (prev.quantity || 0) + payload.qty;

      return {
        ...state,
        [key]: { ...prev, ...payload, key, quantity: nextQty },
      };
    }

    /* ----------  UPDATE QUANTITY  ---------- */
    case 'UPDATE_QTY': {
      const { key, qty } = action.payload;
      console.log('key -', key);
      
      if (!state[key] || typeof qty !== 'number' || qty < 1) return state;
      return {
        ...state,
        [key]: { ...state[key], quantity: qty },
      };
    }

    /* ----------  REMOVE  ---------- */
    case 'REMOVE': {
      const { key } = action.payload;
      if (!state[key]) return state;                    // nothing to remove
      const { [key]: _, ...rest } = state;
      return rest;
    }

    /* ----------  CLEAR  ---------- */
    case 'CLEAR':
      return {};

    default:
      return state;
  }
}

/* ─────────────────────────  Provider  ───────────────────────── */

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, {});

  /* helpers that UI components call */
  const addItem = (productObj, size, thickness, qty = 1) =>
    dispatch({
      type: 'ADD',
      payload: { ...productObj, size, thickness, qty },
    });

  const updateQty = (key, qty) =>
    dispatch({ type: 'UPDATE_QTY', payload: { key, qty } });

  const removeItem = key => dispatch({ type: 'REMOVE', payload: { key } });

  const clearCart = () => dispatch({ type: 'CLEAR' });

  /* derived data */
  const itemsArray = useMemo(() => Object.values(cart), [cart]);
  const totalQuantity = useMemo(
    () => itemsArray.reduce((sum, item) => sum + item.quantity, 0),
    [itemsArray],
  );

  const value = {
    cart,          // raw object
    itemsArray,    // array for FlatList
    totalQuantity,
    addItem,
    updateQty,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* custom hook */
export const useCart = () => useContext(CartContext);
