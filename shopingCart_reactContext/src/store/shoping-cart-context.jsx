import { createContext ,useReducer } from "react";
import { shoppingCartReducer } from "./shopping-cart-reducer";
export const CartContext = createContext({
  items: [],
  addItemToCart: (item) => {},
  removeItemFromCart: (id) => {},
  clearCart: () => {},  
});

export default function CartContextProvider({children}){
      // useReducer(reducer , initialState)
      const [shoppingCartState , shoppingCartDispatch] = useReducer(shoppingCartReducer , {items: []});

      function handleAddItemToCart(id) {
       shoppingCartDispatch({type: "ADD_ITEM" , payload: id})
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({type: "UPDATE_ITEM",payload: { productId, amount },
        });
      }
      // connect he items to the state 
      const cartCtx = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
      };
    
      return (
        <CartContext.Provider value={cartCtx}>
          {children}
        </CartContext.Provider>
      );
      
} 

