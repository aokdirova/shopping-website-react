import { AnyAction } from 'redux';
import { CartItem } from './cart.types';
import { setCartItems, setCartIsOpen } from './cart.action';

const CART_INITIAL_STATE: CartState = {
	isCartOpen: false,
	cartItems: [],
};

export type CartState = {
	readonly isCartOpen: boolean;
	readonly cartItems: CartItem[];
};

export const cartReducer = (
	state = CART_INITIAL_STATE,
	action: AnyAction
): CartState => {
	if (setCartIsOpen.match(action)) {
		return {
			...state,
			isCartOpen: action.payload,
		};
	}

	if (setCartItems.match(action)) {
		return {
			...state,
			cartItems: action.payload,
		};
	}

	return state;
	// switch (type) {
	// 	case CART_ACTION_TYPES.SET_CART_ITEMS:
	// 		return {
	// 			...state,
	// 			cartItems: payload,
	// 		};

	// 	case CART_ACTION_TYPES.SET_CART_IS_OPEN:
	// 		return {
	// 			...state,
	// 			isCartOpen: payload,
	// 		};
	// 	default:
	// 		return state;
	// }
};
