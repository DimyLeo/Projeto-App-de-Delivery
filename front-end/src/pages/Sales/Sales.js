import React, { useMemo } from 'react';
import CardSales from '../../components/CardSales/CardSales';
import Header from '../../components/Header/Header';
import useFetch from '../../hooks/useFetch';
import fetchGet from '../../utils/fetchGet';
import styles from './Sales.module.css';

const role = 'seller';

function Sales() {
  const endpoint = '/checkout';
  const fetchOptions = useMemo(() => (fetchGet(endpoint)), []);

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
