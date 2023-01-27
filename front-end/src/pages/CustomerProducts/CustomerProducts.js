import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import CheckoutButton from '../../components/CheckoutButton/CheckoutButton';
import Header from '../../components/Header/Header';
import Product from '../../components/Product/Product';
import useFetch from '../../hooks/useFetch';
import { getLocalStorage } from '../../utils/localStorage';
import styles from './CustomerProducts.module.css';

// const MOCK_VALID_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSB6aWthIiwi
// ZW1haWwiOiJjbGllbnRlQGhvdG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjc0NjgwNjUwLCJleH
// AiOjE2NzY0MDg2NTB9.68xRy7oZC4RnwFBc0CSBxDBm3roI1h8l_OmAsckxxw4`;

// duvida1 posso usar o useEffect no customHook useFetch?
// duvida2 posso passar os options assim \/ ?
const fetchOptions = ({
  method: 'get',
  url: 'http://localhost:3001/products',
  headers: { Authorization: getLocalStorage('user')?.token },
});

function CustomerProducts() {
  // const fetchOptions = useRef();

  const [count, setCount] = useState(0);
  const [data, isLoading] = useFetch(fetchOptions);
  const products = data?.data;
  return (
    <>
      <button type='button' onClick={ () => setCount((prev) => (prev + 1)) }> { count } </button>
      <Header />
      <div className={styles['page-container']}>
        <div className={styles.container}>
          <div className={styles['products-container']}>
            {!isLoading &&
              products?.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            <CheckoutButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerProducts;
