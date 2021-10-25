import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { Layout, Menu, Badge, Avatar } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { SubMenu } = Menu;

// TODO : login olunca navbar update

const Navbar = () => {
    let history = useHistory();

    const [current, setCurrent] = useState("main");
    const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
    const [cartCount, setCartCount] = useState(!!localStorage.getItem("basket"));

    useEffect(() => {
        setIsLogged(!!localStorage.getItem("token"));
    }, [isLogged, cartCount]);

    const handleClick = (e) => {
        if (e.key === "logout") {
            handleLogout();
        } else {
            setCurrent(e.key);
            history.push(`/${e.key}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLogged(false);
        history.push("/");
    };

    return (
        <Header>
            <a href="/">
                <img
                    src="https://clarusway.com/wp-content/uploads/2020/09/cw_son_editted.png"
                    alt={"Logo"}
                    className="logo"
                    style={{ float: "left" }}

                />
            </a>

            <Menu
                onClick={handleClick}
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[current]}
            >
                <Menu.Item key={""} >Home</Menu.Item>
                <Menu.Item key={"books"} >Books</Menu.Item>
                {
                    isLogged ?
                        <>
                            <Menu.Item key={"cart"}>
                                <Badge count={4}>
                                    <Avatar
                                        style={{ backgroundColor: 'rgba(0, 222, 0, 0.4)' }}
                                        icon={<ShoppingCartOutlined />}></Avatar>
                                </Badge>
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                                <Menu.Item key={"profile"}>Profile</Menu.Item>
                                <Menu.Item key={"logout"}>Logout</Menu.Item>
                            </SubMenu>
                        </>
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