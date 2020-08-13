import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getToken} from '../../utils/session';
//私有化组件  无状态组件
const PrivateRouter = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={routeProps => (
                getToken() ? <Component  {...routeProps} /> : <Redirect to='/'></Redirect>
            )}
        />
    );
}
export default PrivateRouter;