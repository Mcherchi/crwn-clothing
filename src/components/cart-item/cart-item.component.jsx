import { useContext } from 'react';
import './cart-item.styles.scss';
import { CartContext } from '../../context/cart.context';

const CartItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  const { clearItemFromCart } = useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem);

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
        <span className="remove-button" onClick={clearItemHandler}>
          &#10005;
        </span>
      </div>
    </div>
  );
};

export default CartItem;
