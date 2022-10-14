import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../utils/reducer.utils';

//helper functions

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		(item) => item.id === productToAdd.id
	);

	if (existingCartItem) {
		return cartItems.map((item) =>
			item.id === productToAdd.id
				? { ...item, quantity: item.quantity + 1 }
				: item
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCheckoutItem = (cartItems, productToRemove) => {
	return cartItems.filter(
		(cartItem) => cartItem.id !== productToRemove.id
	);
};

const removeCartItem = (cartItems, productToRemove) => {
	const existingCartItem = cartItems.find(
		(item) => item.id === productToRemove.id
	);

	if (existingCartItem.quantity === 1) {
		return cartItems.filter(
			(cartItem) => cartItem.id !== productToRemove.id
		);
	}

	return cartItems.map((item) =>
		item.id === productToRemove.id && item.quantity >= 0
			? { ...item, quantity: item.quantity - 1 }
			: item
	);
};

//actions
export const addItemToCart = (cartItems, productToAdd) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
	const newCartItems = removeCartItem(cartItems, productToRemove);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCheckout = (
	cartItems,
	productToRemove
) => {
	const newCartItems = removeCheckoutItem(cartItems, productToRemove);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setCartIsOpen = (bool) =>
	createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, bool);
