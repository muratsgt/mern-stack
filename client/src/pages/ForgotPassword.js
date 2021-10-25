import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { postData } from '../helper/PostData';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';

const ForgotPassword = () => {

    let history = useHistory();

    const onFinish = (values) => {
        postData("/api/auth/forgotpass", values).then((data) => {
            message.success(data.message, 3);
            history.push("/");
        }).catch(err => {
            message.error('Email does not match our records.', 3);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('Email does not match our records.', 3);
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

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </div >
    )
};

export default ForgotPassword;