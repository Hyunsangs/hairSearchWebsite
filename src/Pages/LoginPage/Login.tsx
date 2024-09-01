import React, { useState } from 'react';
import '../../Styles/Login.scss';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../Store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../Slice/AuthSlice';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(loginUser({ username, password }));
        if (loginUser.fulfilled.match(resultAction)) {
            console.log('로그인 성공:', resultAction.payload);
            navigate('/');
        } else {
            console.log('로그인 실패:', resultAction.payload);
        }
    }

    return (
        <>
            <div className="container">
                <h1 className="logo">FindMyStyle</h1>
                <form onSubmit={handleLogin} className="card">
                    <div className="card_header">
                        <div className="card-content">로그인</div>
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
                                placeholder='비밀번호'
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="input_password"
                            />
                        </div>
                        {error && <div className="error_message">{error}</div>}
                        <button type='submit' className="login_button" disabled={loading}>
                            {loading ? '로그인 중...' : '로그인'}
                        </button>
                    </div>
                    <div className="footer">
                        <div className="footer_content">
                            <div className="content">
                                아이디가 없으신가요?
                            </div>
                            <Link to='/register'>계정 생성하기</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
