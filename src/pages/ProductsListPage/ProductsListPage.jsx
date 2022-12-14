import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/errormessage/errormessage';
import Loader from '../../components/loader/Loader';
import Paginate from '../../components/Paginate/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../../redux/reducers/product/product.actions';
import ProductActionTypes from '../../redux/reducers/product/product.types';
import Swal from 'sweetalert2';

const ProductsListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productsList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: ProductActionTypes.PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push('/');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/add`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    history,
    pageNumber,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    Swal.fire({
      title: 'Are you sure to delete this Product?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));

        Swal.fire('Deleted!', 'Your Product has been deleted.', 'success');
      }
    });
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const [searchWord,setSearchWord] = useState("");
  const handleFilter = (event)=>{
   
    const searchPlant = event.target.value;
    console.log(searchPlant);
    setSearchWord(searchPlant);
 
    if (searchPlant === ''){
      console.log("Empty")
      dispatch(listProducts('',pageNumber))
    }else {
      dispatch(listProducts(searchWord,pageNumber))
    }


  }
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col>
         <input className='form-control' type='search' placeholder='Search' name='searchPlant' onChange={handleFilter}></input>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
        <Col className='text-right'>
        <Link to='/admin/report'>
          <Button className='my-3'>
            View Reports
          </Button></Link>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && (
        <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>
      )}
      {loadingCreate && <Loader />}
      {errorCreate && (
        <ErrorMessage variant='danger'>{errorCreate}</ErrorMessage>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='light'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash' style={{color:"red"}}></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductsListPage;
