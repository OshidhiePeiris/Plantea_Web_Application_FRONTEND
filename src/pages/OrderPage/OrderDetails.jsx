import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../../redux/reducers/order/order.actions';
import { ListGroup, Card, Row, Col, Image, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/errormessage/errormessage';
import Loader from '../../components/loader/Loader';
import { OrderActionTypes } from '../../redux/reducers/order/order.types';
import Pdf from "react-to-pdf";

const OrderDetails = ({ history, match }) => {
  const ref = React.createRef();
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay} = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver} = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const options = {

    orientation: "potrait",

    unit: "in",

    format: [20, 8],

  };

  if (!loading) {
    //calculate price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: OrderActionTypes.ORDER_PAY_RESET });
      dispatch({ type: OrderActionTypes.ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } 
  }, [dispatch, orderId, successPay, successDeliver, history, userInfo, order]);

  const successPaymentHandler = () => {
    dispatch(payOrder(order));
  };
  

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Link to='/admin/orderlist' className='btn btn-primary my-3'>
        Go Back
      </Link>{' '}
      <div ref={ref} id={'body'}>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.PostalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Ordered Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order Is Empty!</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = $
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={successPaymentHandler}
                  >
                    Demo Pay
                  </Button>
                </ListGroup.Item>
            
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverHandler}
                  >
                    Mark As Delivered!
                  </Button>
                </ListGroup.Item>
       
            </ListGroup>
          </Card>
        </Col>
      </Row>
      </div>
      <Pdf targetRef={ref} filename="Order Reciept.pdf" options={options}>
          {({ toPdf }) => <Button onClick={toPdf} variant='primary'>Save As PDF</Button>}
        </Pdf>
        <Button style={{ float: "right" }} onClick={() => window.print()} variant='primary'>Print</Button>
        
    </>
  );
};

export default OrderDetails;
