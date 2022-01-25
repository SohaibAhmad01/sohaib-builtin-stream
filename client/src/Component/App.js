import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from '../History';
import StreamCreate  from '../Component/Stream/StreamCreate';
import StreamEdit from '../Component/Stream/StreamEdit';
import StreamShow from '../Component/Stream/StreamShow';
import StreamDelete from '../Component/Stream/StreamDelete';
import StreamList from '../Component/Stream/StreamList';
import Header from "./Header";


const App=()=>{
    return(
        <div className="ui container">
            
            <Router  history={history}>
                <div>
                    <Header/><hr/>
                    <Switch>
                    <Route path="/" exact component={StreamList}/>
                    <Route path="/Streams/new" exact component={StreamCreate}/>
                    <Route path="/Streams/Delete/:id" exact component={StreamDelete}/>
                    <Route path="/Streams/edit/:id" exact component={StreamEdit}/>
                    <Route path="/Streams/:id" exact component={StreamShow}/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
};
export default App;