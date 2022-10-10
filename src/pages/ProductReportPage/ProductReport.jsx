import React, { useEffect } from 'react';
import { listStock } from '../../redux/reducers/product/product.actions';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/loader/Loader';
import ErrorMessage from '../../components/errormessage/errormessage';
const ProductReport = () => {

    const dispatch = useDispatch();
    const productStock = useSelector((state) => state.productStock);
    const { loading, error, products } = productStock

    useEffect(() => {
        dispatch(listStock());
    }, [dispatch]);


    return loading ? (
        <Loader />
    ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
    ) : (

        <div class="card text-center card text-white bg-success mb-3">

            <div class="card-body">
                <h5 class="card-title">Stock Count</h5>

                <div>

                    {products.map(data => {
                        return (
                            <h1 className='card-text'>{data.total}</h1>
                        )
                    })}
                </div>
            </div>
        </div>

    );

}

export default ProductReport