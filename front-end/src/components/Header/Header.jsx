import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { logoutAction } from '../../redux/actions/cartActions';
import { getLocalStorage } from '../../utils/localStorage';
import HeaderLink from '../HeaderLink/HeaderLink';
import styles from './Header.module.css';

function Header() {
  const userData = useMemo(() => getLocalStorage('user'), []);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logoutAction());
    return <Redirect to="/login" />;
  };

  return (
    <header className={ styles.container }>
      <div className={ styles['margin-container'] }>
        <nav className={ styles['common-links-container'] }>
          <HeaderLink />
          {userData?.role === 'customer' && (
            <NavLink
              to="/customer/orders"
              data-testid="customer_products__element-navbar-link-orders"
              className={ styles['product-orders'] }
            >
              Meus Pedidos
            </NavLink>
          )}
        </nav>
        <nav className={ styles['role-links-container'] }>
          <span
            className={ styles['user-name'] }
            data-testid="customer_products__element-navbar-user-full-name"
          >
            {userData?.name}
          </span>
          <NavLink
            onClick={ handleLogout }
            to="/login"
            data-testid="customer_products__element-navbar-link-logout"
            className={ styles.logout }
          >
            Logout
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
