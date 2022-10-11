import { createContext, useState, useEffect } from 'react';

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
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartItemCount, setCartItemCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const newCartItemCount = cartItems.reduce(
			(total, item) => total + item.quantity,
			0
		);

		setCartItemCount(newCartItemCount);
	}, [cartItems]);

	useEffect(() => {
		const newCartTotal = cartItems.reduce(
			(total, item) => total + item.quantity * item.price,
			0
		);

		setCartTotal(newCartTotal);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const removeItemFromCart = (productToRemove) => {
		setCartItems(removeCartItem(cartItems, productToRemove));
	};

	const removeItemFromCheckout = (productToRemove) => {
		setCartItems(removeCheckoutItem(cartItems, productToRemove));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		removeItemFromCart,
		cartItems,
		cartItemCount,
		setCartItemCount,
		removeItemFromCheckout,
		cartTotal,
	};

	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	);
};
