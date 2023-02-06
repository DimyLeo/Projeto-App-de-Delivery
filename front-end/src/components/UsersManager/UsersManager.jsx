import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import useFetch from '../../hooks/useFetch';
import { getLocalStorage } from '../../utils/localStorage';
import styles from './UsersManager.module.css';

const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

function UsersManager({ refetch, setRefetch }) {
  console.log(refetch);
  const endpoint = '/users';
  const fetchOptions = useMemo(
    () => ({
      method: 'get',
      url: `${baseUrl}${endpoint}`,
      headers: { Authorization: getLocalStorage('user')?.token },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refetch],
  );

  const [data, isLoading] = useFetch(fetchOptions);
  const datas = data?.data;

  const handleClick = (async (userId) => {
    try {
      const config = {
        headers: {
          Authorization: getLocalStorage('user')?.token,
        },
      };
      const body = { id: userId };
      const endpointDelete = '/users';
      const res = await axios
        .delete(`${baseUrl}${endpointDelete}`, { data: body }, config);
      setRefetch((prevState) => !prevState);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className={ styles['manager-users'] }>
      <h1>Lista de usuários</h1>

      <table className={ styles.table }>
        <thead className={ styles.thead }>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        {!isLoading
          && datas?.map((user, index) => (
            <tbody className={ styles.tbody } key={ user.id }>
              <tr>
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                >
                  {index + 1}
                </td>

                <td data-testid={ `admin_manage__element-user-table-name-${index}` }>
                  {user.name}
                </td>

                <td
                  data-testid={ `admin_manage__element-user-table-email-${index}` }
                >
                  {user.email}
                </td>

                <td
                  data-testid={ `admin_manage__element-user-table-role-${index}` }
                >
                  {user.role}
                </td>

                <td>
                  <button
                    className={ styles.button }
                    onClick={ () => {
                      handleClick(user.id);
                    } }
                    type="button"
                    data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
}

UsersManager.propTypes = {
  refetch: PropTypes.bool.isRequired,
  setRefetch: PropTypes.func.isRequired,
};

export default UsersManager;
