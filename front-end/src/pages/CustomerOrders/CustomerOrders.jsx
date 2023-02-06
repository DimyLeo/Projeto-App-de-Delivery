import React, { useMemo } from 'react';
import CardSales from '../../components/CardSales/CardSales';
import Header from '../../components/Header/Header';
import useFetch from '../../hooks/useFetch';
import { getLocalStorage } from '../../utils/localStorage';
import styles from './CustomerOrders.module.css';

const role = 'customer';
const HOST = process.env.REACT_APP_API_HOST || 'localhost:3001';
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';

function CustomerOrders() {
  const endpoint = '/checkout';
  const fetchOptions = useMemo(() => ({
    method: 'get',
    url: `${PROTOCOL}://${HOST}${endpoint}`,
    headers: { Authorization: getLocalStorage('user')?.token },
  }), []);

  const [data, isLoading] = useFetch(fetchOptions);
  const datas = data?.data;
  return (
    <div className={ styles['orders-page'] }>
      <Header />
      <div className={ styles.container }>

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

export default CustomerOrders;
