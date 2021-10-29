import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { postData } from '../helper/PostData';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Signin = () => {
    const { setLoggedIn } = useContext(AuthContext)
    let history = useHistory();

    const onFinish = (values) => {
        postData("/api/auth/login", values).then((data) => {
            localStorage.setItem("token", data);
            message.success('Login successfull', 2);
            setLoggedIn(values.email);
            history.push("/");
        }).catch(err => {
            console.log("FINISH ERROR: ", err);
            message.error('Email or password does not match our records.', 2);
        });
    };

    const onFinishFailed = (errorInfo) => {
        message.error("Please enter your email and password correctly.", 2);
    };


    return (
        <div className="App">
            <h3>Welcome back!</h3>
            <p>Sign in for points on each purchase, and more!</p>
            <Form
                id="login_form"
                name="login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{ padding: "30px" }}
            >
                <Form.Item
                    name="email"
                    rules={[{
                        required: true,
                        message: "Please enter your email!"
                    },
                    {
                        type: "email",
                        message: "The input is not valid E-mail!"
                    }
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Email" />

                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{
                        required: true,
                        message: 'Please enter your password!'
                    }, {
                        min: 6,
                        message: 'Must be at least 6 characters!'
                    }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        noStyle
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Button type="link" onClick={() => history.push("/forgotpassword")}>
                        Forgot Password?</Button>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign In
                    </Button>
                    Or <Button type="link" onClick={() => history.push("/signup")}>
                        register now!</Button>
                </Form.Item>
            </Form>

        </div >
    )
};

export default Signin;