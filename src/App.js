import React from 'react';
import Login from './views/login/index';
import Index from './views/index/Index';
import { BrowserRouter, Switch ,Route} from 'react-router-dom';
//私有组件方法

import  PrivateRouter from './components/privateRouter/index';
class App extends  React.Component {
       constructor(props) {
         super();
        this.state ={};
       }
       render() {
         return (
         //React.Fragment 跟标签不被渲染
         <React.Fragment>  
              <BrowserRouter>
                <Switch>
                  <Route  exact component ={Login} path='/'></Route>
                  <PrivateRouter  exact  component ={Index} path='/index'></PrivateRouter>
                </Switch>
              </BrowserRouter>
         </React.Fragment>
         )
       }
}
export default App;
