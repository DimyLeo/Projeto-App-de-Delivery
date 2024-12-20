import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { getLocalStorage } from '../../utils/localStorage';
import styles from './CheckoutForms.module.css';

const HOST = process.env.REACT_APP_API_HOST || 'localhost:3001';
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';

const endpointGet = '/users';
const fetchOptions = {
  method: 'get',
  url: `${PROTOCOL}://${HOST}${endpointGet}`,
  headers: { Authorization: getLocalStorage('user')?.token },
};

const STYLE_CLASSNAMES = {
  FORM_LABEL: 'form-label',
};

function CheckoutForms({ totalPrice, products }) {
  console.log(products);
  const { push } = useHistory();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      seller: '',
      address: '',
      number: '',
    },
    criteriaMode: 'all',
    mode: 'onChange',
  });

  const [userData, isLoading] = useFetch(fetchOptions);
  const sellers = useMemo(() => {
    const sellerData = isLoading
      ? []
      : userData?.data?.filter((person) => person?.role === 'seller');
    setValue('seller', sellerData[0]?.id);
    return sellerData;
  }, [userData, isLoading, setValue]);

  console.log('test');

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      const totalPriceNumber = parseFloat(
        (Number(totalPrice.replace(',', '')) / 100).toFixed(2),
      );
      const payload = {
        deliveryAddress: formData.address,
        deliveryNumber: formData.number,
        totalPrice: totalPriceNumber,
        products,
        sellerId: formData.seller,
      };

      const endpointPost = '/customer/checkout';
      const postOptions = {
        method: 'post',
        url: `${PROTOCOL}://${HOST}${endpointPost}`,
        headers: { Authorization: getLocalStorage('user')?.token },
        data: payload,
      };
      const {
        data: {
          response: {
            data: { id },
          },
        },
      } = await axios.request(postOptions);
      push(`/customer/orders/${id}`);
    } catch (error) {
      console.log(error);
      console.log(errors);
    }
  };

  return (
    <div className={ styles['form-container'] }>
      <h2>Detalhes e Endereço para Entrega</h2>
      <form className={ styles.form } onSubmit={ handleSubmit(onSubmit) }>
        <label className={ styles[STYLE_CLASSNAMES.FORM_LABEL] } htmlFor="text">
          Endereço
          <input
            className={ styles.inputs }
            type="text"
            id="text"
            data-testid="customer_checkout__input-address"
            { ...register('address', {
              required: 'Endereço é obrigatório',
            }) }
          />
        </label>
        <label className={ styles[STYLE_CLASSNAMES.FORM_LABEL] } htmlFor="text">
          Número
          <input
            className={ styles.inputs }
            type="text"
            id="text"
            data-testid="customer_checkout__input-address-number"
            { ...register('number', {
              required: 'Número é obrigatório',
              pattern: {
                value: /[0-9]/,
                message: 'Coloque um número válido',
              },
            }) }
          />
        </label>

        <label className={ styles[STYLE_CLASSNAMES.FORM_LABEL] } htmlFor="select">
          <span>P.Vendedora Responsável:</span>
          <select
            className={ styles.inputRole }
            { ...register('seller') }
            data-testid="customer_checkout__select-seller"
          >
            {/* <option value="">Selecione</option> */}
            {sellers.map((seller) => (
              <option value={ seller.id } key={ seller.id }>
                {seller.name}
              </option>
            ))}
          </select>
        </label>
        <button
          className={ styles.button }
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          disabled={ !isValid }
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  );
}

CheckoutForms.propTypes = {
  totalPrice: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      urlImage: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default CheckoutForms;
