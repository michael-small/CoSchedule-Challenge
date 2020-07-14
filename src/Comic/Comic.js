import React, {Component} from 'react';
import './Comic.css';

export class Comic extends Component {

    render () {
        return (
            <div className="Comic">
                <h2>Comic #{this.props.num} ({this.props.month}/{this.props.day}/{this.props.year})</h2>
                <h1>{this.props.title}</h1>
                <img 
                    src={this.props.img} 
                    alt={this.props.alt} 
                    title={this.props.alt}/> {/* Randall Munroe uses the alt text as the text that shows on hover, but `title` is the <img> property to do that */}
                <br/>
                <p>Link to comic: <a href={'https://xkcd.com/' + this.props.num +'/'}>{'https://xkcd.com/' + this.props.num +'/'}</a></p>
            </div>
        )
    }

}

export default Comic;