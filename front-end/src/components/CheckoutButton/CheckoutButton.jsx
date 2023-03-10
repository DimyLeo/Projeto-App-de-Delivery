import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import calculateTotalPrice from '../../utils/calculateTotalPrice';
import styles from './CheckoutButton.module.css';

function CheckoutButton() {
  const { push } = useHistory();
  const { cartProducts } = useSelector((state) => state.cart);
  const totalPrice = useMemo(() => calculateTotalPrice(cartProducts), [cartProducts]);

  return (
    <nav className={ styles.checkout }>
      <button
        className={ styles.navbutton }
        type="button"
        onClick={ () => push('/customer/checkout') }
        data-testid="customer_products__button-cart"
        disabled={ totalPrice === '0,00' }
      >
        {'Ver carrinho: R$: '}
        <span data-testid="customer_products__checkout-bottom-value">
          {totalPrice || 0}
        </span>
      </button>
    </nav>
  );
}

export default CheckoutButton;
