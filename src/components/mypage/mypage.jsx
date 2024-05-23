import React, { useState, useEffect } from 'react';
import axiosInstance from '../../service/axiosinstance';
import './mypage.css';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [newAddress, setNewAddress] = useState('');
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axiosInstance.get('/members/info')
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  }, []);

  const handleAddressChange = () => {
    axiosInstance.put(`/members/update-address/${userInfo.id}`, { newAddress })
      .then(response => {
        setUserInfo(prevState => ({ ...prevState, address: newAddress }));
        alert('Address updated successfully!');
        setShowModal(false);
        setNewAddress('');
      })
      .catch(error => {
        console.error('Error updating address:', error);
      });
  };

  const handleAccountDeletion = async () => {
    try {
      await axiosInstance.delete(`/members/delete/${userInfo.id}`, {
        data: { email, password }
      });
      await axiosInstance.post('/logout', {}, {
        withCredentials: true,
      });
      localStorage.removeItem('token');
      alert('Account deleted successfully!');
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('탈퇴에 실패했습니다.');
      setEmail('');
      setPassword('');
      setShowDeleteForm(false);
    }
  };

  const translateOrderState = (state) => {
    switch (state) {
      case 'PREPARING':
        return '배송 준비중';
      case 'CANCELLED':
        return '주문 취소';
      case 'SHIPPED':
        return '배송중';
      case 'DELIVERED':
        return '배송 완료';
      default:
        return state;
    }
  };

  const handleCancelOrder = (orderId) => {
    axiosInstance.put(`/orders/cancel/${orderId}`)
      .then(response => {
        alert('주문이 성공적으로 취소되었습니다.');
        window.location.reload();
      })
      .catch(error => {
        console.error('주문 취소 중 오류 발생:', error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewAddress('');
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-page">
      <h1>My Page</h1>
      <div className="my-info">
        <p><strong>고객명:&nbsp;</strong> {userInfo.name}</p>
        <p><strong>이메일:&nbsp;</strong> {userInfo.email}</p>
        <p>
          <strong>주소:&nbsp;&nbsp;&nbsp;</strong> {userInfo.address}
          <button className="change-address" onClick={() => setShowModal(true)}>주소 변경</button>
        </p>
        <p><strong>가입일:&nbsp;</strong> {new Date(userInfo.date).toLocaleString()}</p>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <input className="input-address" type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} placeholder="새로운 주소" />
            <button onClick={handleAddressChange}>주소 변경</button>
          </div>
        </div>
      )}

      <div className="my-orders">
        <h2>내 주문</h2>
        {userInfo.orderDTOS.map(order => (
          order.orderState !== 'CANCELLED' && (
            <div key={order.id} className="order">
              <p className="order-date">주문일: {new Date(order.date).toLocaleDateString()}</p>
              <p className="order-state">{translateOrderState(order.orderState)}</p>
              {order.orderItems.map(item => (
                <div key={item.id} className="order-item">
                  <img
                    src={`/images/${item.imageUrl || "logo.png"}`}
                    alt={item.itemname}
                    className="order-item-image"
                  />
                  <div className="order-item-details">
                    <p className="itemname">{item.itemname}</p>
                    <p className="iteminfo">{item.itemprice}원  {item.quantity}개</p>
                  </div>
                </div>
              ))}
              <button className='cancel-order' onClick={() => handleCancelOrder(order.id)}>결제 취소</button>
            </div>
          )
        ))}
      </div>

      <button className='delete' onClick={() => setShowDeleteForm(!showDeleteForm)}>회원 탈퇴</button>
      {showDeleteForm && (
        <div className="modal">
          <div className="modal-delete-content">
            <span className="close" onClick={() => setShowDeleteForm(false)}>&times;</span>
            <h2>회원 탈퇴</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button onClick={handleAccountDeletion}>탈퇴하기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;