import React, {Component} from 'react';
import './CommentArea.css';

class CommentArea extends Component {

    render () {
        return (
            <div style={{'margin-bottom': '1rem'}}>
                <h2>Comments</h2>
                <div className="commentArea">
                <div className="comment">
                    <p>Michael Small</p>
                    <p>Sep 7, 2021 3:46am</p>
                    <p>The meat of the comment. I really aught to install a lorem ipsum plugin for VSC, because it was 
                    very annoying to write this out for myself. Oh well. I guess I aught to write out just a bit more so I can see it
                    wrap onto a third line.</p>
                </div>            
                <div className="comment">
                    <p>Michael Small</p>
                    <p>Sep 7, 2021 3:46am</p>
                    <p >The meat of the comment. I really aught to install a lorem ipsum plugin for VSC, because it was 
                    very annoying to write this out for myself. Oh well. I guess I aught to write out just a bit more so I can see it
                    wrap onto a third line.</p>
                </div>
                </div>
            </div>
        )
    }

}

export default CommentArea;






















