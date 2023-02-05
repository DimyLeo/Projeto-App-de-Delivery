import React, { useMemo } from 'react';
import CheckoutButton from '../../components/CheckoutButton/CheckoutButton';
import Header from '../../components/Header/Header';
import Product from '../../components/Product/Product';
import useFetch from '../../hooks/useFetch';
import styles from './CustomerProducts.module.css';

const baseUrl = process.env.BASE_URL || 'https://back-end-delivery.up.railway.app';

function CustomerProducts() {
  const endpoint = '/products';
  const fetchOptions = useMemo(() => ({
    method: 'get',
    url: `${baseUrl}${endpoint}`,
    headers: { Authorization: getLocalStorage('user')?.token },
  }), []);

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
