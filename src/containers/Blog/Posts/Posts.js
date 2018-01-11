import React, { Component } from 'react';
import axios from '../../../axios';
import { Route, Link } from 'react-router-dom';
import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
        console.log(this.props);
        axios.get( '/posts' )
            .then( response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                // console.log( response );
            } )
            .catch(error => {
                console.log(error);
                // this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
      //for navigating programatically, remove setState and add below code
      //this.props.history.push({pathname:'/posts/'+id});
        this.setState({selectedPostId: id});
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
              //remove <Link> and add key property back to <Post> to navigate programatically , also changes in postSelectedHandler>
                return <Link to = {'/posts/' + post.id } key={post.id} >
                          <Post
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)} />
                        </Link>;
            });
        }

        return (
          <div>
            <section className="Posts">
                {posts}
            </section>
            <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
          </div>

        );
    }
}

export default Posts;
