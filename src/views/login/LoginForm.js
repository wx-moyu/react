import React from 'react';
import { Form, Input, Button, message } from 'antd';      // from 表单
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';   //栅格布局
import './index.scss';
import { loginApi, getSmsApi } from '../../api/account'
//验证 
import { validate_password } from '../../utils/validate'
class LgoinForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            code_button_loading: false,
            code_button_text: '获取验证码',
            code_button_disabled: false
        };
    }
    //表单验证通过调用的方法
    onFinish = (values) => {
        console.log('Received values of form: ', values);
        loginApi(values).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    };
    countDown = () => {
        let sec = 5;     //倒计时
        let timer = null; // 定时器
        //关闭lodaing
        this.setState({
            code_button_loading: false,
            code_button_text: `${sec}s`
        });
        // 定时器
        timer = setInterval(() => {
            sec--;
            if (sec <= 0) {
                this.setState({
                    code_button_text: '获取验证码',
                    code_button_disabled: false
                })
                clearInterval(timer);
                return false;
            }
            this.setState({
                code_button_text: `${sec}s`
            });
        }, 1000);
    };
    //获取验证码
    getCode = () => {
        if (!this.state.username) {
            message.warning('用户名不能为空', 1);
            return false;
        }
        this.setState({
            code_button_loading: true,
            code_button_text: '发送中',
            code_button_disabled: true
        })
        const requsetData = {
            username: this.state.username,
            moudel: 'login'
        }
        getSmsApi(requsetData).then(response => {
            if (response.resCode === 0) {

                this.countDown();
            }
        }).catch(error => {
            this.setState({
                code_button_loading: false,
                code_button_text: '重新获取',
                code_button_disabled: false
            })
            message.warning(error.message, 1);
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
        const { code_button_loading, code_button_text, code_button_disabled } = this.state;
        // const _this = this;
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
                            { type: 'email', message: '邮箱格式不正确' },
                            // ({ getFieldValue }) => ({
                            //     validator(rule, value) {
                            //         if (regEmail(value)) {
                            //             _this.setState({
                            //                 codeBtnDisStatus: false
                            //             });
                            //             return Promise.resolve();
                            //         }
                            //         return Promise.reject('邮箱格式不正确');
                            //     }
                            // })
                        ]}>
                            <Input value={this.state.username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item name="password" rules={[
                            { required: true, message: '密码不能为空' },
                            { pattern: validate_password, message: '6至20位字母加数字' },
                        ]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="code" rules={[
                            { required: true, message: '验证码不能为空' },
                            { len: 6, message: '请输入6位验证码' }]}>
                            <Row gutter='13'>
                                <Col span='14'>
                                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="code" />
                                </Col>
                                <Col span='10'>
                                    <Button type='danger' block onClick={this.getCode} disabled={code_button_disabled} loading={code_button_loading}>{code_button_text}</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block> 登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}
export default LgoinForm;