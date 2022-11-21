import { CART_ACTION_TYPES, CartItem } from './cart.types';
import { CategoryItem } from '../categories/categories.types';
import {
	createAction,
	ActionWithPayload,
	withMatcher,
} from '../../utils/reducer.utils';

//helper functions

const addCartItem = (
	cartItems: CartItem[],
	productToAdd: CategoryItem
): CartItem[] => {
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

const removeCheckoutItem = (
	cartItems: CartItem[],
	productToRemove: CartItem
): CartItem[] => {
	return cartItems.filter(
		(cartItem) => cartItem.id !== productToRemove.id
	);
};

const removeCartItem = (
	cartItems: CartItem[],
	productToRemove: CartItem
): CartItem[] => {
	const existingCartItem = cartItems.find(
		(item) => item.id === productToRemove.id
	);

	if (existingCartItem && existingCartItem.quantity === 1) {
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
export type SetCartItems = ActionWithPayload<
	CART_ACTION_TYPES.SET_CART_ITEMS,
	CartItem[]
>;

export const setCartItems = withMatcher(
	(cartItems: CartItem[]): SetCartItems =>
		createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

///////////////////////////////////////////////////////////////////////
export const addItemToCart = (
	cartItems: CartItem[],
	productToAdd: CategoryItem
) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return setCartItems(newCartItems);
};

export const removeItemFromCart = (
	cartItems: CartItem[],
	productToRemove: CartItem
) => {
	const newCartItems = removeCartItem(cartItems, productToRemove);
	return setCartItems(newCartItems);
};

export const removeItemFromCheckout = (
	cartItems: CartItem[],
	productToRemove: CartItem
) => {
	const newCartItems = removeCheckoutItem(cartItems, productToRemove);
	return setCartItems(newCartItems);
};

////////////////////////////////////////////////////////////
export type SetIsCartOpen = ActionWithPayload<
	CART_ACTION_TYPES.SET_CART_IS_OPEN,
	boolean
>;

export const setCartIsOpen = withMatcher(
	(bool: boolean): SetIsCartOpen =>
		createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, bool)
);
