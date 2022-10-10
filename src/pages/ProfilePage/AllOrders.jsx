import React, {  useEffect } from 'react';
import {  Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import ErrorMessage from '../../components/errormessage/errormessage';
import Loader from '../../components/loader/Loader';
import {
  getUserDetails
} from '../../redux/reducers/user/user.actions';
import UserActionTypes from '../../redux/reducers/user/user.types';
import { listMyOrders } from '../../redux/reducers/order/order.actions';
import { listProducts } from '../../redux/reducers/product/product.actions';

const AllOrdersPage = ({ history }) => {

  const dispatch = useDispatch();
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const {  user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name || success) {
        dispatch({ type: UserActionTypes.USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } 
    }
  }, [dispatch, history, userInfo, user, success]);
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);


 

  return (
    <Row>
      <Col>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <ErrorMessage variant='danger'>{errorOrders}</ErrorMessage>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAl</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light '>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
            
            
          </Table>
        )}
        <Button style={{float:"right"}} onClick={() => window.print()} variant='primary'>Generate Report</Button>
      </Col>
    </Row>
  );
};

export default AllOrdersPage;
