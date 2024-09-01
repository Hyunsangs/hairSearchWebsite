import { Link, useNavigate } from "react-router-dom";
import '../Styles/NavBar.scss'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store";
import { logoutUser } from "../Slice/AuthSlice";

const NavBar: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/');
    };

    return (
        <div className="nav_container">
            
            {user && (
                <>
                    <Link to='/record'>최근 검색</Link>
                    <button onClick={handleLogout}>로그아웃</button>
                </>
            ) 
            
            }
        </div>
    )

}

export default NavBar;