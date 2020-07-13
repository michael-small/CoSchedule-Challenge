import React, { Component } from 'react';
import './Comment.css';

export class Comment extends Component {

    render () {
        return (
            <div className="comment">
                <p>Michael Small</p>
                {this.props.comment}
                {/* <button onClick={this.props.delComment.bind(this, this.props.comment)}>X</button> */}
            </div>
        )
    }
}

export default Comment;