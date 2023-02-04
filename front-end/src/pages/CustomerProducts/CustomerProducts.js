import React, { useMemo } from 'react';
import CheckoutButton from '../../components/CheckoutButton/CheckoutButton';
import Header from '../../components/Header/Header';
import Product from '../../components/Product/Product';
import useFetch from '../../hooks/useFetch';
import fetchGet from '../../utils/fetchGet';
import styles from './CustomerProducts.module.css';

function CustomerProducts() {
  const endpoint = '/products';
  const fetchOptions = useMemo(() => (fetchGet(endpoint)), []);

  const [data, isLoading] = useFetch(fetchOptions);

  const products = data?.data;
  return (
    <>
      <Header />
      <div className={ styles['page-container'] }>
        <div className={ styles.container }>
          <div className={ styles['products-container'] }>
            {!isLoading
              && products?.map((product) => (
                <Product product={ product } key={ product.id } />
              ))}
            <CheckoutButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerProducts;
