import axios from 'axios';
import React, { useMemo } from 'react';
import useFetch from '../../hooks/useFetch';
import { getLocalStorage } from '../../utils/localStorage';
import styles from './UsersManager.module.css';

function UsersManager() {
  const handleClick = (async (userId) => {
    try {
      const config = {
        headers: {
          Authorization: getLocalStorage('user')?.token,
        },
      };

      const body = { id: userId };

      const res = await axios.delete('http://localhost:3001/users', { data: body }, config);

      return res.data;
    } catch (error) {
      console.error(error);
    }
  });

  const fetchOptions = useMemo(() => ({
    method: 'get',
    url: 'http://localhost:3001/users',
    headers: { Authorization: getLocalStorage('user')?.token },
  }), []);

  const [data, isLoading] = useFetch(fetchOptions);
  const datas = data?.data;
  return (
    <div className={ styles['manager-users'] }>
      <h1>Lista de usuários</h1>

      {!isLoading
            && datas?.map((index) => (
              <table className={ styles.table } key={ index.id }>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Tipo</th>
                    <th>Excluir</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>

                    <td
                      data-testid={ `admin_manage
                      __element-user-table-item-number-${index.id}` }
                    >
                      {index.id}
                    </td>

                    <td
                      data-testid="admin_manage__input-email"
                    >
                      {index.name}
                    </td>

                    <td
                      data-testid={ `admin_manage
                      __element-user-table-email-${index.email}` }
                    >
                      {index.email}
                    </td>

                    <td
                      data-testid={ `admin_manage
                    __element-user-table-role-${index.role}` }
                    >
                      {index.role}
                    </td>

                    <td>
                      <button
                        onClick={ (() => {
                          handleClick(index.id);
                        }) }
                        type="button"
                        data-testid={ `admin_manage
                    __element-user-table-remove-${index.id}` }
                      >
                        Excluir
                      </button>
                    </td>

                  </tr>
                </tbody>
              </table>
            ))}

    </div>
  );
}

export default UsersManager;
