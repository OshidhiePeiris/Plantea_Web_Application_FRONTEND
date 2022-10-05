import React, { useEffect } from 'react';
import {Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/errormessage/errormessage';
import Loader from '../../components/loader/Loader';
import { listProducts } from '../../redux/reducers/product/product.actions';

const AdminProfilePage = ({ history }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const {products} = productList;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders } = orderListMy;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);


  return (
    <Row>
      <Col >

        <h2>Reviews</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <ErrorMessage variant='danger'>{errorOrders}</ErrorMessage>
        ) : (
          <Table striped bordered  responsive className='table-sm'>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Reviews</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>
                  <Table striped bordered responsive className='table-sm'>
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Rating</th>
                        <th>Review</th>
                      </tr>
                    </thead>
                    <tbody>           
                      {product.reviews.map(review => (
                        <tr key={review._id}>
                        <td>{review.name}</td>
                        <td>{review.rating}</td>
                        <td>{review.comment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table></td>
        
            
            </tr>
                
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default AdminProfilePage;
