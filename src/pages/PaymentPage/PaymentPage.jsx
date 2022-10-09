import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Payment from './Payment.jpg';
import { savePaymentMethod } from '../../redux/reducers/cart/cart.actions';
import CheckoutSteps from '../../components/checkoutsteps/CheckoutSteps';
import Visa from './visa.png';
import Master from './master-card.png';
import PayPal from './paypal.png';
import CashOD from './cash-on-delivery.png';

const PaymentPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Visa Card');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 />
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <Image
            src={Payment}
            alt='Payment Logo'
            fluid
            style={{ border: 'none' }}
          ></Image>
        </Col>
        <Col xs={12} md={6}>
          <h1>Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as='legend'>Select Method</Form.Label>
              <Col>
              <div onChange={(e) => setPaymentMethod(e.target.value)}>
                <Form.Check
                  type='radio'
                  src={Visa}
                  label='Visa Card'
                  id='paymentMethod'
                  name='paymentMethod'
                  value='Visa Card'
                  checked
                ></Form.Check>
                <Form.Check
                  type='radio'
                  src={Master}
                  label='Master Card'
                  id='Master Card'
                  name='paymentMethod'
                  value='Master Card'
                ></Form.Check>
                <Form.Check
                  type='radio'
                  src={PayPal}
                  label='PayPal'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                ></Form.Check>
                <Form.Check
                  type='radio'
                  src={CashOD}
                  label='Cash On Delivery'
                  id='Cash On Delivery'
                  name='paymentMethod'
                  value='Cash On Delivery'
                ></Form.Check>
                </div>
              </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
