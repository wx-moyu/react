import React from 'react';
import Login from './views/login/index';
import {HashRouter, Switch ,Route} from 'react-router-dom';
class App extends  React.Component {
       constructor(props) {
         super();
        this.state ={};
       }
       render() {
         return (
         //React.Fragment 跟标签不被渲染
         <React.Fragment>  
              <HashRouter>
                <Switch>
                  <Route  component ={Login} path='/'></Route>
                </Switch>
              </HashRouter>
         </React.Fragment>
         )
       }
}
export default App;
