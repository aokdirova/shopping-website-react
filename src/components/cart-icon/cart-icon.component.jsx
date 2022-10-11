import { useContext } from 'react';
import {
	ShoppingIcon,
	CartIconContainer,
	ItemCount,
} from './cart-icon.styles.jsx';
import { CartContext } from '../../context/cart.context';

const CartIcon = () => {
	const { isCartOpen, setIsCartOpen, cartItemCount } =
		useContext(CartContext);

	const toggleButton = () => {
		setIsCartOpen(!isCartOpen);
	};
	return (
		<CartIconContainer>
			<ShoppingIcon
				onClick={toggleButton}
				className='shopping-icon'
			/>
			<ItemCount className='item-count'>{cartItemCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
