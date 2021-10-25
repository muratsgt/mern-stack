import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { postData } from '../helper/PostData';
import { useHistory } from 'react-router-dom';
import { message} from 'antd';

const Signin = () => {

    let history = useHistory();

    const onFinish = (values) => {
        postData("/api/auth/login", values).then((data) => {
            localStorage.setItem("token", data);
            message.success('Login successfull',3);
            history.push("/");
        }).catch(err => {
            console.log("FINISH ERROR: ",err);
            message.error('Email or password does not match our records.',3);
        });
    };

    const onFinishFailed = (errorInfo) => {
        message.error("Please enter your email and password correctly.",3);
    };


    return (
        <div className="App">
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

                    <a className="login-form-forgot" href="/forgotpassword">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign In
                    </Button>
                    Or <a href="/signup">register now!</a>
                </Form.Item>
            </Form>

        </div >
    )
};

export default Signin;