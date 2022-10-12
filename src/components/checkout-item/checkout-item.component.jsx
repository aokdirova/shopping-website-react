import {
	CheckoutItemContainer,
	ImageContainer,
	BaseSpan,
	Quantity,
	Arrow,
	Value,
	RemoveButton,
} from './checkout-item.styles';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CheckoutItem = ({ product }) => {
	const { imageUrl, name, quantity, price } = product;
	const {
		addItemToCart,
		removeItemFromCart,
		removeItemFromCheckout,
	} = useContext(CartContext);

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={name} />
			</ImageContainer>
			<BaseSpan>{name}</BaseSpan>

			<Quantity>
				<Arrow onClick={() => removeItemFromCart(product)}>
					&larr;
				</Arrow>
				<Value>{quantity}</Value>

				<Arrow onClick={() => addItemToCart(product)}>&rarr;</Arrow>
			</Quantity>

			<BaseSpan>{quantity * price}</BaseSpan>
			<RemoveButton onClick={() => removeItemFromCheckout(product)}>
				&#10005;
			</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
