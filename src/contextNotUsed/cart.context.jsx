import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer.utils';

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

export const CART_ACTION_TYPES = {
	SET_CART_IS_OPEN: 'SET_CART_IS_OPEN',
	SET_CART_ITEM: 'SET_CART_ITEM',
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartItemCount: 0,
	cartTotal: 0,
};

export const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEM:
			return {
				...state,
				...payload,
			};
		case CART_ACTION_TYPES.SET_CART_IS_OPEN:
			return {
				...state,
				isCartOpen: payload,
			};
		default:
			throw new Error(`Unhandled type ${type} in userReducer`);
	}
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	cartItemCount: 0,
	removeItemFromCheckout: () => {},
	cartTotal: 0,
});

export const CartProvider = ({ children }) => {
	// const [isCartOpen, setIsCartOpen] = useState(false);
	// const [cartItems, setCartItems] = useState([]);
	// const [cartItemCount, setCartItemCount] = useState(0);
	// const [cartTotal, setCartTotal] = useState(0);

	const [
		{ isCartOpen, cartItems, cartItemCount, cartTotal },
		dispatch,
	] = useReducer(cartReducer, INITIAL_STATE);

	// useEffect(() => {
	// 	const newCartItemCount = cartItems.reduce(
	// 		(total, item) => total + item.quantity,
	// 		0
	// 	);

	// 	setCartItemCount(newCartItemCount);
	// }, [cartItems]);

	// useEffect(() => {
	// const newCartTotal = cartItems.reduce(
	// 	(total, item) => total + item.quantity * item.price,
	// 	0
	// );

	// setCartTotal(newCartTotal);

	// 	setItemCountandTotal(cartItems);
	// }, [cartItems]);

	const updateCartItemReducer = (newCartItems) => {
		const newCartItemCount = newCartItems.reduce(
			(total, item) => total + item.quantity,
			0
		);

		const newCartTotal = newCartItems.reduce(
			(total, item) => total + item.quantity * item.price,
			0
		);

		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEM, {
				cartItems: newCartItems,
				cartItemCount: newCartItemCount,
				cartTotal: newCartTotal,
			})
		);
	};

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemReducer(newCartItems);
	};

	const removeItemFromCart = (productToRemove) => {
		const newCartItems = removeCartItem(cartItems, productToRemove);
		updateCartItemReducer(newCartItems);
	};

	const removeItemFromCheckout = (productToRemove) => {
		const newCartItems = removeCheckoutItem(
			cartItems,
			productToRemove
		);
		updateCartItemReducer(newCartItems);
	};

	const setIsCartOpen = (boolean) => {
		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, boolean)
		);
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		removeItemFromCart,
		cartItems,
		cartItemCount,
		removeItemFromCheckout,
		cartTotal,
	};

	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	);
};
