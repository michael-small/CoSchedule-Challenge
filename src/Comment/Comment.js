import React, { Component } from 'react';
import './Comment.css';

export class Comment extends Component {

    render () {
        return (
            <div className="comment">
                <b>Michael Small</b>
                <button onClick={this.props.delComment.bind(this, this.props.comment)} className="deleteComment">X</button>
                <p>{this.props.comment}</p>
            </div>
        )
    }
}

export default Comment;