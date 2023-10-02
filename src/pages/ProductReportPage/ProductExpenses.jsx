import React, { useEffect } from 'react';
import {listProductExpenses } from '../../redux/reducers/product/product.actions';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/loader/Loader';
import ErrorMessage from '../../components/errormessage/errormessage';
const ProductExpenses = () => {

    const dispatch = useDispatch();
    const productExpense = useSelector((state) => state.productExpense);
    const { loading, error, products } = productExpense

    useEffect(() => {
        dispatch(listProductExpenses());
    }, [dispatch]);


    return loading ? (
        <Loader />
    ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
    ) : (

        <div class="card text-center card text-white bg-success mb-3">

            <div class="card-body">
                <h5 class="card-title">Total Expenses</h5>

                <div>

                    {/* {products.map(data => {
                        return (
                            <h1 className='card-text'>$ {data.total}</h1>
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

export default ProductExpenses