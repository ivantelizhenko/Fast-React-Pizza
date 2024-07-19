import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],

  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: 'Mediterranean',
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
    },
    deleteIngredient: {
      prepare(pizzaId, ingredient) {
        return { payload: { pizzaId, ingredient } };
      },
      reducer(state, action) {
        // payload = {pizzaId, ingredient}

        const item = state.cart.find(
          el => el.pizzaId === action.payload.pizzaId,
        );

        item.ingredients = item.ingredients.filter(
          el => el !== action.payload.ingredient,
        );
        item.removeIngredients.push(action.payload.ingredient);
      },
    },
    addIngredient: {
      prepare(pizzaId, ingredient) {
        return { payload: { pizzaId, ingredient } };
      },
      reducer(state, action) {
        // payload = {pizzaId, ingredient}
        const transformIngredient = action.payload.ingredient
          .toLowerCase()
          .trim();

        const item = state.cart.find(
          el => el.pizzaId === action.payload.pizzaId,
        );

        if (
          item.ingredients.includes(transformIngredient) ||
          !transformIngredient
        )
          return;
        item.ingredients.push(transformIngredient);
        item.addIngredients.push(transformIngredient);
      },
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find(item => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find(item => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  deleteIngredient,
  addIngredient,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = state => state.cart.cart;

export const getTotalCartQuantity = state =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = state =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = id => state =>
  state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;

// 'reselect'
