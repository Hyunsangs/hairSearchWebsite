import React, { useState } from 'react';
import '../../Styles/Register.scss';
import { AppDispatch, RootState } from '../../Store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../Slice/AuthSlice';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다');
            return;
        }

        const resultAction = await dispatch(registerUser({ username, password, name }));
        if (registerUser.fulfilled.match(resultAction)) {
            navigate('/');
        }
    }

    return (
        <>
            <div className="container">
                <h1 className="logo">FindMyStyle</h1>
                <form className="card" onSubmit={handleRegister}>
                    <div className="card_header">
                        <div className="card-content">회원가입</div>
                    </div>
                    <div className="card_main">
                        <div className="input_container">
                            <input
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='아이디'
                                className="input_userid"
                            />
                        </div>
                        <div className="input_container">
                            <input
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='이름'
                                className="input_name"
                            />
                        </div>
                        <div className="input_container">
                            <input
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='비밀번호'
                                className="input_password"
                            />
                        </div>
                        <div className="input_container">
                            <input
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder='비밀번호 확인'
                                className="input_second_password"
                            />
                        </div>
                        <button type="submit" className="register_button" disabled={loading}>
                            {loading ? 'Loading...' : '회원가입'}
                        </button>
                        {error && <p className="error_message">{error}</p>}
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register;
