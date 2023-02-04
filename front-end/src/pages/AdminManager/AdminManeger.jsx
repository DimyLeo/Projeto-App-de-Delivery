import React, { useState } from 'react';
import AdminRegister from '../../components/AdminRegister/AdminRegister';
import Header from '../../components/Header/Header';
import UsersManager from '../../components/UsersManager/UsersManager';
import styles from './Admin.module.css';

function Manager() {
  const [refetch, setRefetch] = useState(false);
  return (
    <div className={ styles['manager-page'] }>
      <Header />
      <AdminRegister setRefetch={ setRefetch } />
      <UsersManager refetch={ refetch } setRefetch={ setRefetch } />
    </div>
  );
}

export default Manager;
