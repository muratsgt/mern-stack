import { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom";
import { Layout, Menu, Avatar } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/AuthContext";
import { fetchData } from "../helper/FetchData";
import logo from "../bookstore2.png";

const { Header } = Layout;
const { SubMenu } = Menu;


const Navbar = () => {
    let history = useHistory();
    const { isLoggedIn, setLoggedIn } = useContext(AuthContext);
    const [current, setCurrent] = useState("main");

    useEffect(() => {
        // checks if the user logged in
        fetchData("/api/profile").then((data) => {
            setLoggedIn(data?.email);
        }).catch((err) => setLoggedIn(false));
    }, [isLoggedIn]);

    const handleClick = (e) => {
        if (e.key === "logout") {
            handleLogout();
        } else {
            setCurrent(e.key);
            history.push(`/${e.key}`);
        }
    };

    const handleLogoClick = () => {
        history.push("/");
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        history.push("/");
    };

    return (
        <Header>
            <img
                src={logo}
                alt={"Logo"}
                className="logo"
                style={{ float: "right" }}
                onClick={handleLogoClick}
            />
            <Menu
                onClick={handleClick}
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[current]}
            >
                <Menu.Item key={""} >Home</Menu.Item>
                <Menu.Item key={"books"} >Books</Menu.Item>
                <Menu.Item key={"cart"}>
                    <Avatar
                        style={{ backgroundColor: 'rgba(0, 222, 0, 0.4)' }}
                        icon={<ShoppingCartOutlined />}>
                    </Avatar>
                </Menu.Item>
                {
                    isLoggedIn ?
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key={"profile"}>Profile</Menu.Item>
                            <Menu.Item key={"logout"}>Logout</Menu.Item>
                        </SubMenu>
                        :
                        <>
                            <Menu.Item key={"signin"}>Signin</Menu.Item>
                            <Menu.Item key={"signup"}>Signup</Menu.Item>
                        </>
                }
            </Menu>
        </Header >
    )
};

export default Navbar;