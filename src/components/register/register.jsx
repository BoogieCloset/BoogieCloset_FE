import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css';

export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [confirmPassword, setConfirmPassword] = useState('');
    
    const navigate = useNavigate();

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            const response = await axios.post('/members/add', formData);
            if (response.status === 200) {
                console.log('Registration successful:', response.data);

                alert('회원 가입이 성공적으로 완료되었습니다.');
                // 홈 화면으로 이동
                navigate('/login');
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.register_text}>Register</h1>
            <form onSubmit={handleSubmit}>
                <p>Name</p>
                <input
                    className={styles.input_style1}
                    type="text"
                    placeholder="홍길동"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <p>Email address</p>
                <input
                    className={styles.input_style1}
                    type="email"
                    placeholder="email@janesfakedomain.net"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <p>Password</p>
                <input
                    className={styles.input_style1}
                    type="password"
                    placeholder="password"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    required
                />
                <p>Password Confirmation</p>
                <input
                    className={styles.input_style1}
                    type="password"
                    placeholder="password"
                    value={confirmPassword}
                    name="confirmpassword"
                    onChange={handleConfirmPasswordChange}
                    required
                />
                <p>Address</p>
                <input
                    className={styles.input_style1}
                    type="text"
                    placeholder="서울특별시 성북구 삼선교로16길 116"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <button className={styles.button_style} type="submit">Register</button>
            </form>
        </div >
    );
};
