export const initialState = {
  basket: [],
  user: null,
};

// Selector to calculate the total price of items in the basket
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log("Action:", action); // Debug log
  console.log("Current state:", state); // Debug log
  console.log("Current basket:", state.basket); // Additional debug log

  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
        console.log("Item removed, new basket:", newBasket); // Debug log
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as it's not in basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
