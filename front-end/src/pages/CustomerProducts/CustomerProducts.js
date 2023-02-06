import React, { useMemo } from 'react';
import CheckoutButton from '../../components/CheckoutButton/CheckoutButton';
import Header from '../../components/Header/Header';
import Product from '../../components/Product/Product';
import useFetch from '../../hooks/useFetch';
import { getLocalStorage } from '../../utils/localStorage';
import styles from './CustomerProducts.module.css';

const HOST = process.env.REACT_APP_API_HOST || 'localhost:3001';
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';

function CustomerProducts() {
  const endpoint = '/products';
  const fetchOptions = useMemo(() => ({
    method: 'get',
    url: `${PROTOCOL}://${HOST}${endpoint}`,
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
