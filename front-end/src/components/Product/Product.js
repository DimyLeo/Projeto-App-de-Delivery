import PropTypes from 'prop-types';
import React from 'react';
import QuantityControl from '../QuantityControl/QuantityControl';
import styles from './Product.module.css';

function Product({ product }) {
  const { urlImage, price, name, id } = product;
  return (
    <div className={ styles['margin-container'] }>
      <div className={ styles.container }>
        <span data-testid={ `customer_products__element-card-price-${id}` }>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price)}
        </span>
        <img
          className={ styles['product-image'] }
          src={ urlImage }
          alt={ name }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
        <div>
          <span
            data-testid={ `customer_products__element-card-title-${id}` }
            className={ styles['product-title'] }
          >
            {name}
          </span>
          <QuantityControl id={ id } productData={ product } />
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    urlImage: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
