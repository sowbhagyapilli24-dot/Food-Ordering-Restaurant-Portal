import {
  createContext,
  useContext,
  useState
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  const addToCart = (food) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === food.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...food, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);