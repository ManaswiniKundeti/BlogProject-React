import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount () {
      console.log(this.props);
      this.loadData();
    }

    componentDidUpdate() { // update called as changes were made, so we have to use componentDidUpdate
      this.loadData();
    }
    loadData() {
      if ( this.props.match.params.id ) {
          if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id) ) {   //this.props.match.params.id is a string, convert to number by adding '+' before it or remove type check by  having != instead of !==
              axios.get( '/posts/' + this.props.match.params.id)
                  .then( response => {
                      // console.log(response);
                      this.setState( { loadedPost: response.data } );
                  } );
          }
      }
    }
    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
            });
    }

    render () {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if ( this.props.match.params.id ) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if ( this.state.loadedPost ) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;
