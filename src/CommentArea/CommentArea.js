import React, {Component} from 'react';
import './CommentArea.css';
import Comment from '../Comment/Comment.js'

class CommentArea extends Component {

    render () {
        return (
            <div style={{'marginBottom': '1rem'}}>
                <h2>Comments</h2>
                <div className="commentArea">
                    <form onSubmit={() => this.props.clickCreate(this.value)} className="comicSearch"> {/* TODO: Break out into own component */}
                        <input 
                            type="text" 
                            name="comment" 
                            placeholder="Add comment" 
                            value={this.props.comment}
                            onChange={this.props.onChange}
                        />
                    </form>
                    <button onClick={this.props.clickCreate}>Create Comment</button>
                    <div>
                        {this.props.comments.map((comment, index) => (
                        <Comment key={index} 
                            comment={comment} 
                            delComment={this.props.delComment}
                            className="comment"/>
                        ))}
                    </div>            
                </div>
            </div>
        )
    }

}

export default CommentArea;






















