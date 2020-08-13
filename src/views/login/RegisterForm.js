import React from 'react';
import { Form, Input, Button, message } from 'antd';      // from 表单
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';   //栅格布局
import './index.scss';
import Code from '../../components/code';
import { registerApi } from '../../api/account';
import { validate_password } from '../../utils/validate';
import Crypto from 'crypto-js'
class RegisterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            register_btn_loading: false
        };
    }
    //表单方法
    onFinish = (values) => {
        this.setState({
            register_btn_loading: true
        })
        delete values.passwords;
        values.password = Crypto.MD5(values.password).toString();  //密码MD5加密
        registerApi(values).then(response => {
        
            if (response.resCode === 0) {
                this.toggleForm();
                this.setState({
                    register_btn_loading: false
                })
            } else {
                message.info(response.message);
            }
        }).catch(error => {
            this.setState({
                register_btn_loading: false
            })
            message.info(error.message);
        });
    };
    //输入事件
    inputChange = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        });
    }
    //组件切换 调用父组件方法
    toggleForm = () => {
        this.props.switchForm("login");
    };
    render() {
        const { username, register_btn_loading } = this.state;
        return (
            <React.Fragment>
                <div className='form-headr'>
                    <h4 className='column'>注册</h4>
                    <span onClick={this.toggleForm}>登录</span>
                </div>
                <div className='form-content'>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item name="username" rules={
                            [{ required: true, message: '请输入用户名' },
                            { type: 'email', message: '邮箱格式不正确' }]}>
                            <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{
                            required: true, message: '请输入密码'
                        },
                        { pattern: validate_password, message: '请输入6至20位字母加数字' }
                        ]}>
                            <Input type='password' prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="passwords" rules={[
                            { required: true, message: '再次确认密码不能为空' },
                            { pattern: validate_password, message: '请输入6至20位字母加数字' },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    let password = getFieldValue('password');
                                    if (password === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('两次密码不一致');
                                }
                            })]}>
                            <Input type='password' prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Passwords" />
                        </Form.Item>
                        <Form.Item name="code" rules={[{ required: true, message: '请输入验证码', len: 6 }]}>
                            <Row gutter='13'>
                                <Col span='14'> <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="code" /> </Col>
                                <Col span='10'><Code username={username} formType='register' /></Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={register_btn_loading} className="login-form-button" block> 注册</Button>
                        </Form.Item>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}
export default RegisterForm;