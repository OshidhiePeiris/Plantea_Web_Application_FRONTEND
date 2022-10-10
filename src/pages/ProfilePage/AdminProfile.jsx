import React, { useEffect } from 'react';
import {Row, Col, Table, Button } from 'react-bootstrap';
import Pdf from "react-to-pdf";
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/errormessage/errormessage';
import Loader from '../../components/loader/Loader';
import { listProducts } from '../../redux/reducers/product/product.actions';

const AdminProfilePage = ({ history }) => {
  const dispatch = useDispatch();
  const ref = React.createRef();

  const options = {

    orientation: "potrait",
  
    unit: "in",
  
    format: [20, 11],
  
  };

  const [search, setSearch] = React.useState("");
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
      <input className='form-control' type='search' placeholder='Search' name='searchPlant' value={search}
            onChange={(event) => setSearch(event.target.value)}></input>
      <div ref={ref} id={'body'}>
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
            {products.filter((product) => {
              if(search === "") {
                return product;
              } 
              else if(product.name.toLowerCase().includes(search.toLowerCase())) {
                return product;
              }
              else
              return null;
            }).map((product) => (
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
        )}</div>
        <Pdf targetRef={ref} filename="All Reviews.pdf" options={options}>
        {({ toPdf }) => <Button onClick={toPdf} variant='primary'>Save As PDF</Button>}
      </Pdf>
      <Button style={{float:"right"}} onClick={() => window.print()} variant='primary'>Print</Button>
      </Col>
    </Row>
  );
};

export default AdminProfilePage;
