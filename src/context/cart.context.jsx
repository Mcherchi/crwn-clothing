import { useEffect } from 'react';
import { createContext, useState } from 'react';

const addItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find((item) => item.id === productToAdd.id);

  if (existingItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : { ...item }
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const decreaseItem = (cartItems, productToDecrease) => {
  const existingItem = cartItems.find(
    (item) => item.id === productToDecrease.id
  );

  if (existingItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToDecrease.id);
  }

  return cartItems.map((item) =>
    item.id === productToDecrease.id
      ? { ...item, quantity: item.quantity - 1 }
      : { ...item }
  );
};

const clearItem = (cartItems, cartItemToClear) =>
  cartItems.filter((item) => item.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decreaseItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addItem(cartItems, productToAdd));
  };

  const decreaseItemFromCart = (productToDecrease) => {
    setCartItems(decreaseItem(cartItems, productToDecrease));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    decreaseItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
