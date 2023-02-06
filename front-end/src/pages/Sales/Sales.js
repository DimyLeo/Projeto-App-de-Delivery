import React, { useMemo } from 'react';
import CardSales from '../../components/CardSales/CardSales';
import Header from '../../components/Header/Header';
import useFetch from '../../hooks/useFetch';
import { getLocalStorage } from '../../utils/localStorage';
import styles from './Sales.module.css';

const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const role = 'seller';

function Sales() {
  const endpoint = '/products';
  const fetchOptions = useMemo(() => ({
    method: 'get',
    url: `${baseUrl}${endpoint}`,
    headers: { Authorization: getLocalStorage('user')?.token },
  }), []);

  const [data, isLoading] = useFetch(fetchOptions);
  const datas = data?.data;
  return (
    <div className={ styles['pedidos-page'] }>
      <Header />
      <div className={ styles['pedidos-container'] }>

        {!isLoading
            && datas?.map((index) => (
              <div className={ styles.card } key={ index.id }>
                <CardSales order={ index } role={ role } dataTestid={ role } />
                {' '}
              </div>
            ))}
      </div>
    </div>
  );
}

export default Sales;
