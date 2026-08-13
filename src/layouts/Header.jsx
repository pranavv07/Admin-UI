
import { useNavigate } from "react-router-dom";
function Header() {
    const navigate = useNavigate();
    const handleNavigateAbout = () => {
        navigate("/about");
    }
    const handleNavigateHome = () => {
        navigate("/");
    }
    return (
        <div className="header">
            <h1>Admin UI</h1>
            <div className="header-right">
                <button className="btn btn-primary link" onClick={handleNavigateHome}>Home</button>
                <button className="btn btn-primary link" onClick={handleNavigateAbout}>About</button>
            </div>
        </div>
    );
}

export default Header;