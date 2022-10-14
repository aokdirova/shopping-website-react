import { useSelector, useDispatch } from 'react-redux';
import {
	ShoppingIcon,
	CartIconContainer,
	ItemCount,
} from './cart-icon.styles.jsx';
import {
	selectCartCount,
	selectIsCartOpen,
} from '../../store/cart/cart.selector';
import { setCartIsOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
	const isCartOpen = useSelector(selectIsCartOpen);
	const cartItemCount = useSelector(selectCartCount);
	const dispatch = useDispatch();

	const toggleButton = () => {
		dispatch(setCartIsOpen(!isCartOpen));
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
