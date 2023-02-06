import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { setLocalStorage } from '../../utils/localStorage';
import styles from './Register.module.css';

const STYLE_CLASSNAMES = {
  FORM_LABEL: 'form-label',
};

const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

function Register() {
  const [isError, setIsError] = useState([]);
  const { push } = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    criteriaMode: 'all',
    mode: 'onBlur',
  });

  const handleError = (error) => {
    const statusCode = error.response.status;
    const badResponse = 409;
    if (statusCode === badResponse) {
      setIsError(['Email não disponível ou já cadastrado']);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const endpoint = '/users';
      const { data: { response: { token } } } = await axios.post(
        `${baseUrl}${endpoint}`,
        formData,
      );
      const { password: _password, ...rest } = formData;
      const localStoragePayload = { ...rest, role: 'customer', token };
      setLocalStorage('user', localStoragePayload);
      push('/customer/products');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className={ styles['register-page'] }>
      <main className={ styles['register-container'] }>
        <h1>Cadastre-se</h1>
        <form
          onSubmit={ handleSubmit(onSubmit) }
          className={ styles['form-container'] }
        >
          <label htmlFor="name" className={ styles[STYLE_CLASSNAMES.FORM_LABEL] }>
            Nome Completo
            <input
              type="name"
              id="name"
              data-testid="common_register__input-name"
              { ...register('name', {
                required: 'Nome é obrigatório',
                minLength: {
                  value: 12,
                  message: 'Nome completo deve ter pelo menos 12 letras',
                },
              }) }
            />
            {errors?.name && <p>{errors.name.message}</p>}
          </label>
          <label
            htmlFor="email"
            className={ styles[STYLE_CLASSNAMES.FORM_LABEL] }
          >
            Email
            <input
              type="email"
              id="email"
              data-testid="common_register__input-email"
              { ...register('email', {
                required: 'Email é obrigatório',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Email deve ser no formato exemplo@exemplo.com',
                },
              }) }
            />
            {errors?.email && <p>{errors.email.message}</p>}
          </label>
          <label
            htmlFor="password"
            className={ styles[STYLE_CLASSNAMES.FORM_LABEL] }
          >
            Senha
            <input
              type="password"
              id="password"
              data-testid="common_register__input-password"
              { ...register('password', {
                required: 'Password é obrigatório',
                minLength: { value: 6, message: 'Password is too short!' },
                // pattern: {
                //   value: /^(?=.*[A-Z])[A-Za-z\d]*$/,
                //   message: 'Please enter at least one uppercase letter!',
                // },
              }) }
            />
            {errors?.password && <p>{errors.password.message}</p>}
          </label>
          <button
            type="submit"
            data-testid="common_register__button-register"
            disabled={ !isValid }
          >
            CADASTRAR
          </button>
          {isError
            && isError.map((errorMessage) => (
              <p
                key="errorMessage"
                data-testid="common_register__element-invalid_register"
              >
                {errorMessage}
              </p>
            ))}
        </form>
      </main>
    </div>
  );
}

export default Register;
