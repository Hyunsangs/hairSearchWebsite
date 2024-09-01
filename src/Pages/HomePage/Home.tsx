import { useSelector } from 'react-redux';
import ImgGetModal from '../../Components/ImgGetModal';
import NavBar from '../../Components/Navbar';
import '../../Styles/Home.scss'
import { useState } from 'react';
import { RootState } from '../../Store';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    
    const [animate, setAnimate] = useState(true);
    const [ ImgModalToggle, setImgModalToggle ] = useState(false)
    const { user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();


    const onStop = () => {
        setAnimate(false);
    }
    const onRun = () => {
        setAnimate(true);
    }

    const buttonhandle = () => {
        if(!user) {
            navigate('/login');
        }
        setImgModalToggle(!ImgModalToggle)
    }

    const images = [
        '../img/0.jpg',
        '../img/12.jpg',
        '../img/24.jpg',
        '../img/38.jpg',
        '../img/76.jpg',
    ];

    return (
        <div className='main_home_wrapper'>
          <NavBar />
          {ImgModalToggle && <ImgGetModal closeModal={() => setImgModalToggle(false)} />}
          <h1>내가 원하는 헤어스타일을 해주는 미용실 찾기</h1>
          <div className="wrapper">
            <div className="slide_container">
              <ul
                className="slide_wrapper"
                onMouseEnter={onStop}
                onMouseLeave={onRun}
              >
                <div className={"slide original".concat(animate ? "" : " stop")}>
                  {images.map((s, i) => (
                    <li key={i}>
                      <img src={s} alt='img' />
                    </li>
                  ))}
                </div>
                <div className={"slide clone".concat(animate ? "" : " stop")}>
                  {images.map((s, i) => (
                    <li key={i}>
                      <img src={s} alt='img' />
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          </div>
          <div className='explain_wrapper'>
            <div className='title'>
              <h1>내가 원하는 머리 스타일의 사진을 넣고 미용실을 찾아보세요.</h1>
            </div>
            <button onClick={buttonhandle}>시작하기</button>
          </div>
        </div>
      );
    }


export default Home;