import React, { Component } from 'react';
// import axios from 'axios';
import { Route, NavLink, Switch, Redirect} from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
//import NewPost from './NewPost/NewPost';
//import FullPost from './FullPost/FullPost';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
  return import('./NewPost/NewPost'); //dynamic import syntax, what comes btween () is only executed
});

class Blog extends Component {
  state = {
    auth: true
  }
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                  to="/posts/"
                                  exact
                                  activeClassName="my-active"
                                  activeStyle={{
                                    color : '#fa923f',
                                    textDecoration : 'underline'
                                  }}>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>Home 2</h1>} /> */}
                <Switch>
                  {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                  <Route path="/posts"  component={Posts} />
                  <Route render={() => <h1>Not Found</h1>}/>   //to catch any 404 error; cant be used along with <Redirect /> } */}
                  //<Redirect from="/" to="/posts" /> //redirect dosnt render content but, simply changes url so that we can render content according to changed url
                </Switch>
            </div>
        );
    }
}

export default Blog;
