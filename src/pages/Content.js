import React, { Component } from 'react';


class Content extends Component {

    constructor(props){
        super(props);   

        this.state = {
        };
    }

    render(){

        var contentStyle = { padding: 20 }

        var content = this.props.loggedIn ? `Welcome ${this.props.user.name}` : "";

        return (
            <div style={contentStyle}>
                {content}
            </div>
        )
    }

}

export default Content


