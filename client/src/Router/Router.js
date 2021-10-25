import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Main from "../pages/Main"
import Cart from "../pages/Cart"
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import BookList from "../pages/BookList"
import BookDetail from "../pages/BookDetail"
import Dashboard from "../pages/Dashboard"
import ForgotPassword from "../pages/ForgotPassword";
import Navbar from "../components/Navbar";
import '../App.css';


const { Content, Footer } = Layout;

const AppRouter = () => {
    return (
        <Router>
            <Layout className="layout">
                <Navbar />
                <Content style={{ padding: "0 40px" }}>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/cart" component={Cart} />
                        <Route exact path="/signin" component={Signin} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/books" component={BookList} />
                        <Route exact path="/bookdetail/:id" component={BookDetail} />
                        <Route exact path="/profile" component={Dashboard} />
                        <Route exact path="/forgotpassword" component={ForgotPassword} />
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Murat Design ©2021</Footer>
            </Layout>
        </Router>
    )
};

export default AppRouter;