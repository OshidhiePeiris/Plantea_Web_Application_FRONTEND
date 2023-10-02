import React, { useEffect } from 'react';
import { listProdCount } from '../../redux/reducers/product/product.actions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import ErrorMessage from '../../components/errormessage/errormessage';
const ProductCount = () => {


    const dispatch = useDispatch();
    const productProCount = useSelector((state) => state.productProCount);
    const { loading, error, products } = productProCount

    useEffect(() => {
        dispatch(listProdCount());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
    ) : (
        <div class="card text-center card text-white bg-success mb-3">

            <div class="card-body">
                <h5 class="card-title">Number of Products</h5>

                <div>
{/* 
                    {products.map(data => {
                        return (
                            <h1 className='card-text'>{data.total}</h1>
                        )
                    })} */}
                    {products.map((data, index) => {
        return (
            <h1 className='card-text' key={index}>{data.total}</h1>
        );
    })}
                </div>
            </div>
        </div>

    );

}

export default ProductCount