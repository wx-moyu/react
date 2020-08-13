import React from 'react';
//私有路由
import PrivateRouter from '../privateRouter/index';
//内容区
import UserIndex from '../../views/user/index';
import UserAdd from '../../views/user/add';
import { Switch } from 'react-router-dom';
class containerMain extends React.Component {
    constructor(props) {
        super();
        this.state = {};
    }
    render() {
        return (
            <Switch>
                <PrivateRouter exact path='/index/user/list' component={UserIndex} />
                <PrivateRouter exact path='/index/user/add' component={UserAdd} />
            </Switch>
        )
    }
}
export default containerMain;
