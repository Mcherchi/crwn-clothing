import { useEffect } from 'react';
import { createContext, useState } from 'react';

const addItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find((item) => item.id === productToAdd.id);

  if (existingItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...productToAdd, quantity: item.quantity + 1 }
        : { ...item }
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeItem = (cartItems, productToRemove) => {
  const existingItem = cartItems.find((item) => item.id === productToRemove.id);

  if (existingItem) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }

  return [...cartItems];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addItem(cartItems, productToAdd));
  };

  const removeItemToCart = (productToRemove) => {
    setCartItems(removeItem(cartItems, productToRemove));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    cartItems,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
