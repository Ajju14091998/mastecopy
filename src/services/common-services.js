import api from '../config/axiosInstance';
const fetchSubCategories = async (categoryId) => {
  try {
    const response = await api.post(`dashboard/getsubcategorylist?catId=${categoryId}`, {});
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

const fetchProductList = async (data) => {
  try {
    const response = await api.post('dashboard/getproductlist', {...data});
    console.log('fetchProductList Response -', response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch product list:', error);
    return [];
  }
};


export {
  fetchSubCategories,
  fetchFilterList,
  fetchProductList,
};
