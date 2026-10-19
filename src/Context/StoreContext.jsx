
import { createContext, useContext, useMemo, useState } from "react";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("himaanix_cart") || "[]")
  );

  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("himaanix_wishlist") || "[]")
  );

  const saveCart = (items) => {
    setCart(items);
    localStorage.setItem("himaanix_cart", JSON.stringify(items));
  };

  const clearCart = () => saveCart([]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.key === product._id);

    const updatedCart = exists
      ? cart.map((item) =>
        item.key === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      : [...cart, { key: product._id, product, quantity: 1 }];

    saveCart(updatedCart);
  };

  const changeQuantity = (key, quantity) => {
    saveCart(
      quantity < 1
        ? cart.filter((item) => item.key !== key)
        : cart.map((item) =>
          item.key === key ? { ...item, quantity } : item
        )
    );
  };

  const removeFromCart = (key) => {
    saveCart(cart.filter((item) => item.key !== key));
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item._id === product._id);

    const updatedWishlist = exists
      ? wishlist.filter((item) => item._id !== product._id)
      : [...wishlist, product];

    setWishlist(updatedWishlist);
    localStorage.setItem(
      "himaanix_wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      clearCart,
      addToCart,
      changeQuantity,
      removeFromCart,
      toggleWishlist,
      cartCount: cart.reduce((total, item) => total + item.quantity, 0),
      cartTotal: cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    }),
    [cart, wishlist]
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}
