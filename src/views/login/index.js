import React from 'react';
import './index.scss';
// 自定义组件
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            formType:'login'
        };
    }
    switchForm = (value) => {
        this.setState({
            formType:value
        });
    };
    render() {
        return (
            <div className='form-wrap'>
                <div>
                    {this.state.formType === 'login'? 
                    <LoginForm switchForm={this.switchForm}></LoginForm> :
                    <RegisterForm switchForm={this.switchForm}></RegisterForm>}
                </div>
            </div>

        )
    }
}
export default Login;