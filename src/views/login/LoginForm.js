import React from 'react';
import { Form, Input, Button, message } from 'antd';      // from 表单
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';   //栅格布局
import './index.scss';
import { loginApi } from '../../api/account';
import { withRouter } from 'react-router-dom';  //路由白名单不添加无法跳转
//验证 
import { validate_password } from '../../utils/validate'
import Code from '../../components/code/index';
import Crypto from 'crypto-js';
import {setToken} from '../../utils/session';
class LgoinForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            login_btn_loading: false
        };
    }
    //表单验证通过调用的方法
    onFinish = (values) => {
        this.setState({
            login_btn_loading: true
        });
        values.password = Crypto.MD5(values.password).toString();
        loginApi(values).then(response => {
            if (response.resCode !== 0) {
                message.info(response.message);
            }
            this.setState({
                login_btn_loading: false
            });
            setToken(response.data.token);
            this.props.history.push('/index');
        }).catch(error => {
            this.setState({
                login_btn_loading: false
            });
            message.info(error.message);
        });
    };
    //组件切换
    toggleForm = () => {
        this.props.switchForm("register");
    };
    //输入事件
    inputChange = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        });
    }
    render() {
        const { username, login_btn_loading } = this.state;
        return (
            <React.Fragment>
                <div className='form-headr'>
                    <h4 className='column'>登录</h4>
                    <span onClick={this.toggleForm}>账号注册</span>
                </div>
                <div className='form-content'>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item name="username" rules={[
                            { required: true, message: '邮箱不能为空' },
                            { type: 'email', message: '邮箱格式不正确' }
                        ]}>
                            <Input value={this.state.username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item name="password" rules={[
                            { required: true, message: '密码不能为空' },
                            { pattern: validate_password, message: '6至20位字母加数字' },
                        ]}>
                            <Input type='password' prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="code" rules={[
                            { required: true, message: '验证码不能为空' },
                            { len: 6, message: '请输入6位验证码' }]}>
                            <Row gutter='13'>
                                <Col span='14'>
                                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="code" />
                                </Col>
                                <Col span='10'>
                                    <Code username={username} formType='login' />
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={login_btn_loading} className="login-form-button" block> 登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}
export default withRouter(LgoinForm);