import { CategoryItem } from '../categories/categories.types';

export enum CART_ACTION_TYPES {
	SET_CART_IS_OPEN = 'cart/SET_CART_IS_OPEN',
	SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
	SET_CART_ITEM_COUNT = 'cart/SET_CART_ITEM_COUNT',
	SET_CART_ITEM_TOTAL = 'cart/SET_CART_ITEM_TOTAL',
}

export type CartItem = CategoryItem & {
	quantity: number;
};
