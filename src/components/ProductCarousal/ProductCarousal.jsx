import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import ErrorMessage from '../errormessage/errormessage';
import { listTopProducts } from '../../redux/reducers/product/product.actions';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <ErrorMessage variant='danger'>{error}</ErrorMessage>
  ) : (
    <Carousel pause='hover' style={{backgroundColor:'#8FBC8F'}}>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} style={{height:'450px',paddingRight:'300px'}} alt={product.name} rounded/>
            <Carousel.Caption className='carousel-caption'>
              <h5 style={{float:'right',width:'300px',marginTop:'200px'}} className='text-white'>
                {product.name} (${product.price})
              </h5>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
