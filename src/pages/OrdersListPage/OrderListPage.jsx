import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/errormessage/errormessage';
import Loader from '../../components/loader/Loader';
import { listOrders,deleteOrder } from '../../redux/reducers/order/order.actions';
import Pdf from "react-to-pdf";
import Swal from 'sweetalert2';

const OrderListPage = ({ history }) => {
  const dispatch = useDispatch();
  const ref = React.createRef();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const [search, setSearch] = React.useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const options = {

    orientation: "potrait",

    unit: "in",

    format: [20, 9],

  };
  
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;


  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history,successDelete, userInfo]);

  const deleteHandler = (id) => {
    Swal.fire({
      title: 'Are you sure to delete this Order?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOrder(id));

        Swal.fire('Deleted!', 'Your Order has been deleted.', 'success');
      }
    });
  };

  return (
    <>
    <div ref={ref} id={'body'}>
      <h1>Orders</h1>
      <input className='form-control' type='search' placeholder='Search' name='searchPlant' value={search}
            onChange={(event) => setSearch(event.target.value)}></input>
      {loadingDelete && <Loader />}
      {errorDelete && (
        <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>
      )}    
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>

      ) : (
        
        <Table>
          
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.filter((order) => {
              if(search === "") {
                return order;
              } 
              else if(order.user && order.user.name.toLowerCase().includes(search.toLowerCase())) {
                return order;
              }
              else
              return null;
            }).map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)} </td>
                <td>${order.totalPrice} </td>

                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }} />
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-check' style={{ color: 'green' }} />
                  )}
                </td>
                <td>
                <Button
                      variant='light'
                      className='btn-sm'
                      onClick={() => deleteHandler(order._id)}
                    >
                      <i className='fas fa-trash' style={{color:"red"}}></i>
                    </Button>
                </td>
                <td>
                  <LinkContainer to={`/orderdata/${order._id}`}>
                    <Button variant='dark' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}</div>
      
       <Pdf targetRef={ref} filename="All Orders.pdf" options={options}>
          {({ toPdf }) => <Button onClick={toPdf} variant='primary'>Save As PDF</Button>}
        </Pdf>
        <Button style={{ float: "right" }} onClick={() => window.print()} variant='primary'>Print</Button>
        
    </>
    
  );
};

export default OrderListPage;
