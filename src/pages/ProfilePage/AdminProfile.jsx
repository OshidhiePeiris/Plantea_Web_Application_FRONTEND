import React, { useEffect } from 'react';
import {Row, Col, Table, Button } from 'react-bootstrap';
import {Link} from "react-router-dom";
import Pdf from "react-to-pdf";
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/errormessage/errormessage';
import Loader from '../../components/loader/Loader';
import {jsPDF} from "jspdf";
import { listProducts } from '../../redux/reducers/product/product.actions';

const AdminProfilePage = ({ history }) => {
  const dispatch = useDispatch();
  const ref = React.createRef();

  const options = {

    orientation: "potrait",
  
    unit: "in",
  
    format: [20, 11],
  
  };

  const productList = useSelector((state) => state.productList);
  const {products} = productList;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders } = orderListMy;

  const genaratePDF=()=>{
    let doc =new jsPDF('p','pt','a1');
    doc.html(document.querySelector('#body'),{
        callback:function (doc) {
            doc.save('Room Booking Management Report.pdf');
        },
        margin:[60,60,60,60],
        x:32,
        y:32
    });

}

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);


  return (
    <Row>
      <Col >
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
        )}</div>
        <Pdf targetRef={ref} filename="All Reviews.pdf" options={options}>
        {({ toPdf }) => <Button onClick={toPdf} variant='primary'>Generate Report</Button>}
      </Pdf>
      <Link className="btn btn-success btngena" role="button" id={"generate"} onClick={() => window.print()}>
                Generate Report&nbsp;&nbsp;
                <em className="fa fa-file-pdf-o" id="icon"></em>
            </Link>
      </Col>
    </Row>
  );
};

export default AdminProfilePage;
