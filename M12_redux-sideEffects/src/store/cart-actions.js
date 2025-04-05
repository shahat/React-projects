import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
// sending cart data using action creator
export const sendCartData = (cart) => {
  return async (dispatch) => {
    // dispatch action to make update the notification component
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );
    // send request to the backend
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-redux-6dccf-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      // if response is not ok then update the notification component
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    try {
      await sendRequest();
      // if response is ok then update the notification component
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      // if response is ok then update the notification component
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

// fetching cart data using action creator
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-redux-6dccf-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
          changed: false,
        })
      );
    } catch (error) {
      console.log("cart is empty");
    }
  };
};
