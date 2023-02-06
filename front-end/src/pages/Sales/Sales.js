import React, { useMemo } from 'react';
import CardSales from '../../components/CardSales/CardSales';
import Header from '../../components/Header/Header';
import useFetch from '../../hooks/useFetch';
import { getLocalStorage } from '../../utils/localStorage';
import styles from './Sales.module.css';

const role = 'seller';
const HOST = process.env.REACT_APP_API_HOST || 'localhost:3001';
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';

function Sales() {
  const endpoint = '/checkout';
  const fetchOptions = useMemo(() => ({
    method: 'get',
    url: `${PROTOCOL}://${HOST}${endpoint}`,
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
