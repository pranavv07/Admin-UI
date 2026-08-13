import Header from "./Header";
// import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import "../assets/App.css";
function UserLayout({children}) {
    return (
        <div className="user-layout">
            <Header></Header>
            {children} {/* This is where the child components will be rendered */}
            <Footer></Footer>
        </div>
    );
}

export default UserLayout;