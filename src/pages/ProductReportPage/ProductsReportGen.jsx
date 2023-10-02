import React, { useEffect } from 'react';
import { listExpensesForProd } from '../../redux/reducers/product/product.actions';
import { useDispatch, useSelector } from 'react-redux';
import Pdf from 'react-to-pdf'
import Loader from '../../components/loader/Loader';
import ErrorMessage from '../../components/errormessage/errormessage';
import { Table,Row,Col,Button } from 'react-bootstrap';
const ProductsReportGen = () => {

    const dispatch = useDispatch();
    const ref = React.createRef();
    const options = {

        orientation: "potrait",
      
        unit: "in",
      
        format: [20, 11],
      
      };
    

    const productExpenseForProduct = useSelector((state) => state.productExpenseForProduct);
    const { loading, error, products } = productExpenseForProduct

    useEffect(() => {
        dispatch(listExpensesForProd());
    }, [dispatch]);


    return (<Row><Col><div ref={ref} id={'body'}>
    <h2>Products</h2>
    {loading ? (
        <Loader />
    ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
    ) : (
        
       <Table>
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>Total ($)</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product)=>(
                <tr key={product._id.id}>
                    <td>{product._id.id}</td>
                    <td>{product._id.name}</td>
                    <td>{product.total}</td>
                    
                </tr>
            ))}
        </tbody>
       </Table>
       

    )}</div>
    <Pdf targetRef={ref} filename="Product Expenses.pdf" options={options}>
        {({ toPdf }) => <Button onClick={toPdf} variant='primary'>Save As PDF</Button>}
      </Pdf>
      <Button style={{float:"right"}} onClick={() => window.print()} variant='primary'>Print</Button>
    </Col>
    </Row>
    
    );

}

export default ProductsReportGen



