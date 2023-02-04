import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, setToCart } from '../../redux/actions/cartActions';
import styles from './QuantityControl.module.css';

function QuantityControl({ id, productData }) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    const payload = { ...productData, quantity: quantity + 1 };
    dispatch(addToCart(payload));
    setQuantity((prevState) => prevState + 1);
  };

  const handleDispatchDecrement = () => {
    if (quantity) {
      const payload = { ...productData, quantity: quantity + 1 };
      dispatch(removeFromCart(payload));
    }
  };

  const handleDecrement = () => {
    handleDispatchDecrement();
    setQuantity((prevState) => (prevState ? prevState - 1 : 0));
  };

  const handleQuantityValidation = (value) => {
    if (!value) {
      return 0;
    }
    if (value <= 0) {
      return 0;
    }
    return +value || quantity;
  };

  const handleQuantity = ({ target: { value } }) => {
    const nextQuantity = handleQuantityValidation(value);
    const payload = { ...productData, quantity: nextQuantity };
    dispatch(setToCart(payload));
    setQuantity(nextQuantity);
  };

  return (
    <div className={ styles.container }>
      <button
        type="button"
        onClick={ handleDecrement }
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        className={ styles['quantity-controller'] }
      >
        -
      </button>
      <input
        className={ styles['quantity-display'] }
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="text"
        name="quantity"
        value={ quantity }
        onChange={ handleQuantity }
      />
      <button
        type="button"
        onClick={ handleIncrement }
        data-testid={ `customer_products__button-card-add-item-${id}` }
        className={ styles['quantity-controller'] }
      >
        +
      </button>
    </div>
  );
}

QuantityControl.propTypes = {
  id: PropTypes.number.isRequired,
  productData: PropTypes.shape({
    urlImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default QuantityControl;
