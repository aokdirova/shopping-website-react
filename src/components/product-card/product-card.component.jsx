import {
	ProductCartContainer,
	Footer,
	Name,
	Price,
} from './product-card.styles';
import Button, {
	BUTTON_TYPE_CLASSES,
} from '../button/button.component.jsx';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const ProductCard = ({ product }) => {
	const { addItemToCart } = useContext(CartContext);
	const { name, price, imageUrl } = product;

	const addProductToCart = () => {
		addItemToCart(product);
	};
	return (
		<ProductCartContainer>
			<img src={imageUrl} alt={`${name}`} />
			<Footer>
				<Name>{name}</Name>
				<Price>${price}</Price>
			</Footer>
			<Button
				onClick={addProductToCart}
				buttonType={BUTTON_TYPE_CLASSES.inverted}
			>
				Add to cart
			</Button>
		</ProductCartContainer>
	);
};

export default ProductCard;
