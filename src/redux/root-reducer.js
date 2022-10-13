import { combineReducers } from 'redux';
import {
  productCreateReducer,
  productDeleteReducer,
  productListReducer,
  productReviewCreateReducer,
  productReviewDeleteReducer,
  productTopRatedReducer,
  productUpdateReducer,
  productStockReducer,
  productProCountReducer,
  productExpenseReducer,
  productExpenseForProdReducer,
} from './reducers/product/product.reducer';
import { productDetailsReducer } from './reducers/productdetails/productdetails.reducer';
import { cartReducer } from './reducers/cart/cart.reducer';
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from './reducers/order/order.reducer';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/user/user.reducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productReviewDelete: productReviewDeleteReducer,
  productTopRated: productTopRatedReducer,
  productStock : productStockReducer,
  productProCount : productProCountReducer,
  productExpense : productExpenseReducer,
  productExpenseForProduct : productExpenseForProdReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDelete:orderDeleteReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

export default rootReducer;
