/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { setLocalStorage } from '../../utils/localStorage';
import styles from './Login.module.css';

const STYLE_CLASSNAMES = {
  FORM_VALIDATION: 'form-validation',
  FORM_VALIDATION_SUCCESS: 'form-validation__success',
  FORM_GROUP: 'form-group',
};
const BACKEND_PORT = 3001;
const SUCCESS = 200;

const baseUrl = process.env.REACT_APP_BASE_URL || 'https://back-end-delivery.up.railway.app';

function Login() {
  const [isError, setIsError] = useState([]);
  const { push } = useHistory();
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    criteriaMode: 'all',
    mode: 'onChange',
  });
  const handleRedirect = (role) => {
    switch (role) {
    case 'administrator':
      return push('/admin/manage');
    case 'seller':
      return push('/seller/orders');
    default:
      return push('/customer/products');
    }
  };
  const onSubmit = async (data) => {
    try {
      const endpoint = '/login';
      const {
        data: { response },
        status,
      } = await axios.post(`${baseUrl}${endpoint}`, data, {
        port: BACKEND_PORT,
      });
      if (status !== SUCCESS) {
        throw new Error(response?.message);
      }
      setLocalStorage('user', response);
      handleRedirect(response.role);
    } catch (error) {
      console.log(errors, 'err');
      const errorMessage = error?.response?.data?.message || error.message;
      setIsError([errorMessage]);
    }
  };

  const { isDirty: isPasswordDirty, error: passwordErrors } = getFieldState('password');
  const { isDirty: isEmailDirty, error: emailErrors } = getFieldState('email');

  return (
    <div className={ styles['login-page'] }>
      <main className={ styles['login-container'] }>
        <form
          onSubmit={ handleSubmit(onSubmit) }
          className={ styles['form-container'] }
        >
          <div className={ styles[STYLE_CLASSNAMES.FORM_GROUP] }>
            <label htmlFor="email" className={ styles['form-label'] }>
              Email
            </label>
            <input
              className={ styles['form-input'] }
              type="email"
              id="email"
              data-testid="common_login__input-email"
              { ...register('email', {
                required: 'Please put an email!',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Please enter a valid email!',
                },
              }) }
            />
            <p
              className={ `${styles[STYLE_CLASSNAMES.FORM_VALIDATION]} ${
                isEmailDirty && !emailErrors?.types?.required
                  ? styles[STYLE_CLASSNAMES.FORM_VALIDATION_SUCCESS]
                  : ''
              }` }
            >
              Campo obrigatório
            </p>
            <p
              className={ `${styles[STYLE_CLASSNAMES.FORM_VALIDATION]} ${
                isEmailDirty && !emailErrors?.types?.pattern
                  ? styles[STYLE_CLASSNAMES.FORM_VALIDATION_SUCCESS]
                  : ''
              }` }
            >
              Email deve ser válido
            </p>
          </div>
          <div className={ styles[STYLE_CLASSNAMES.FORM_GROUP] }>
            <label htmlFor="password" className={ styles['form-label'] }>
              Senha
            </label>
            <input
              className={ styles['form-input'] }
              type="password"
              id="password"
              autoComplete="current-password"
              data-testid="common_login__input-password"
              { ...register('password', {
                required: 'Please put a password!',
                minLength: { value: 6, message: 'Password is too short!' },
              }) }
            />
            <p
              className={ `${styles[STYLE_CLASSNAMES.FORM_VALIDATION]} ${
                isPasswordDirty && !passwordErrors?.types?.required
                  ? styles[STYLE_CLASSNAMES.FORM_VALIDATION_SUCCESS]
                  : ''
              }` }
            >
              Coloque uma senha
            </p>
            <p
              className={ `${styles[STYLE_CLASSNAMES.FORM_VALIDATION]} ${
                isPasswordDirty && !passwordErrors?.types?.minLength
                  ? styles[STYLE_CLASSNAMES.FORM_VALIDATION_SUCCESS]
                  : ''
              }` }
            >
              Senha deve ter pelo menos 6 caracteres
            </p>
          </div>
          <div className={ styles[STYLE_CLASSNAMES.FORM_GROUP] }>
            <button
              className={ styles.button }
              type="submit"
              data-testid="common_login__button-login"
              disabled={ !isValid }
            >
              ENTRAR
            </button>
            <button
              className={ styles.button }
              type="button"
              onClick={ () => push('/register') }
              data-testid="common_login__button-register"
            >
              CADASTRAR
            </button>
            {isError
              && isError.map((errorMessage) => (
                <p
                  key="errorMessage"
                  data-testid="common_login__element-invalid-email"
                  className={ styles.error }
                >
                  {
                    errorMessage
                      .includes('404') && 'Usuário não cadastrado ou senha incorreta'
                  }
                </p>
              ))}
          </div>
        </form>
        <div className={ styles['login-hero'] } />
      </main>
    </div>
  );
}

export default Login;
