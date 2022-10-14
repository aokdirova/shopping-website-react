import {
	CheckoutItemContainer,
	ImageContainer,
	BaseSpan,
	Quantity,
	Arrow,
	Value,
	RemoveButton,
} from './checkout-item.styles';
import { useDispatch, useSelector } from 'react-redux';
import {
	addItemToCart,
	removeItemFromCart,
	removeItemFromCheckout,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({ product }) => {
	const { imageUrl, name, quantity, price } = product;
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={name} />
			</ImageContainer>
			<BaseSpan>{name}</BaseSpan>

			<Quantity>
				<Arrow
					onClick={() =>
						dispatch(removeItemFromCart(cartItems, product))
					}
				>
					&larr;
				</Arrow>
				<Value>{quantity}</Value>

				<Arrow
					onClick={() => dispatch(addItemToCart(cartItems, product))}
				>
					&rarr;
				</Arrow>
			</Quantity>

			<BaseSpan>{quantity * price}</BaseSpan>
			<RemoveButton
				onClick={() =>
					dispatch(removeItemFromCheckout(cartItems, product))
				}
			>
				&#10005;
			</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
