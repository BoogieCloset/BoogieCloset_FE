import axios from 'axios';

  // 장바구니 목록 가져오기
  const fetchCartItems = async () => {
    try {
      const response = await axios.get('/viewAll', { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('장바구니 목록 가져오기 실패:', error);
      return [];
    }
  };

  // 장바구니 항목 추가
  const addCartItem = async (cartItem) => {
    try {
      const response = await axios.post('/add', cartItem, { withCredentials: true }); 
      return response.data;
    } catch (error) {
      console.error('장바구니 항목 추가 실패:', error);
      return null;
    }
  };

  // 장바구니 항목 삭제
  const deleteCartItem = async (id) => {
    try {
      await axios.delete(`/delete/${id}`, { withCredentials: true }); 
    } catch (error) {
      console.error('장바구니 항목 삭제 실패:', error);
    }
  };
