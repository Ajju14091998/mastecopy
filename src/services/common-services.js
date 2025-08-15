// import api from '../config/axiosInstance';
// const fetchSubCategories = async (categoryId) => {
//   try {
//     const response = await api.post(`dashboard/getsubcategorylist?catId=${categoryId}`, {});
//     console.log('getsubcategorylist Response -', response);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch sub categories:', error);
//     return [];
//   }
// };

// const fetchFilterList = async () => {
//   try {
//     const response = await api.post('dashboard/getfilterslist', {});
//     console.log('getfilterslist Response -', response);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch filter list:', error);
//     return [];
//   }
// };

// const fetchProductList = async (data) => {
//   try {
//     const response = await api.post('dashboard/getproductlist', {...data});
//     console.log('fetchProductList Response -', response);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch product list:', error);
//     return [];
//   }
// };

// const addOrderApi = async (data) => {
//   try {
//     const response = await api.post('myorders/addorder', {...data});
//     console.log('add Order Response -', response);
//     return response.status;
//   } catch (error) {
//     console.error('Failed to add order:', error);
//     return [];
//   }
// };

// const deleteProductItemApi = async (salesOrderId, itemId, type) => {
//   try {
//     const response = await api.post(`myorders/deleteorderdetails?salesOrderId=${salesOrderId}&itemId=${itemId}&type=${type}`);
//     console.log('delete order Response -', response);
//     return response.status;
//   } catch (error) {
//     console.error('Failed to delete order:', error);
//     return [];
//   }
// };

// const fetchOrdersList = async (data) => {
//   try {
//     const response = await api.post('myorders/getmyorders', {...data});
//     console.log('fetchOrdersList Response -', response);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch order list:', error);
//     return [];
//   }
// };

// const fetchOrdersDetailByID = async (id) => {
//   try {
//     const response = await api.post(`myorders/getsalesorderdetailsbyid?Id=${id}`);
//     console.log('fetchOrdersDetailByID Response -', response);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch order detail by id:', error);
//     return [];
//   }
// };

// export {
//   fetchSubCategories,
//   fetchFilterList,
//   fetchProductList,
//   fetchOrdersList,
//   addOrderApi,
//   deleteProductItemApi,
//   fetchOrdersDetailByID,
// };

import api from '../config/axiosInstance';

const fetchSubCategories = async categoryId => {
  try {
    const response = await api.post(
      `dashboard/getsubcategorylist?catId=${categoryId}`,
      {},
    );
    console.log('getsubcategorylist Response -', response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch sub categories:', error);
    return [];
  }
};

const fetchFilterList = async () => {
  try {
    const response = await api.post('dashboard/getfilterslist', {});
    console.log('getfilterslist Response -', response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch filter list:', error);
    return [];
  }
};

const fetchProductList = async data => {
  try {
    const response = await api.post('dashboard/getproductlist', {...data});
    console.log('fetchProductList Response -', response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch product list:', error);
    return [];
  }
};

const addOrderApi = async data => {
  try {
    const response = await api.post('myorders/addorder', {...data});
    console.log('add Order Response -', response);
    return response.status;
  } catch (error) {
    console.error('Failed to add order:', error);
    return [];
  }
};

const deleteProductItemApi = async (salesOrderId, itemId, type) => {
  try {
    const response = await api.post(
      `myorders/deleteorderdetails?salesOrderId=${salesOrderId}&itemId=${itemId}&type=${type}`,
    );
    console.log('delete order Response -', response);
    return response.status;
  } catch (error) {
    console.error('Failed to delete order:', error);
    return [];
  }
};

const fetchOrdersList = async data => {
  try {
    const response = await api.post('myorders/getmyorders', {...data});
    console.log('fetchOrdersList Response -', response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch order list:', error);
    return [];
  }
};

const fetchOrdersDetailByID = async id => {
  try {
    const response = await api.post(
      `myorders/getsalesorderdetailsbyid?Id=${id}`,
    );
    console.log('fetchOrdersDetailByID Response -', response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch order detail by id:', error);
    return [];
  }
};

// ✅ Newly added API
const fetchCustomerList = async () => {
  try {
    const response = await api.post('dashboard/getcustomerlist', {});
    console.log('fetchCustomerList Response -', response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch customer list:', error);
    return [];
  }
};
// ✅ Newly added
const fetchProductStock = async productId => {
  try {
    const response = await api.post(
      `dashboard/getproductstock?productId=${productId}`,
      {},
    );
    console.log('fetchProductStock Response -', response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch product stock:', error);
    return [];
  }
};

export {
  fetchSubCategories,
  fetchFilterList,
  fetchProductList,
  fetchOrdersList,
  addOrderApi,
  deleteProductItemApi,
  fetchOrdersDetailByID,
  fetchCustomerList,
  fetchProductStock,
};
