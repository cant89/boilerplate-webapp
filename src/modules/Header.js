import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

class Header extends Component {

    constructor(props){
        super(props);    

        this.state = {};
    }
    
    render(){
        
        const buttonStyle = {
            margin: 20
        }
 
        if(this.props.loggedIn){
            var content = 
            <div className="user">
                <img src={this.props.user.photo} className="userPhoto" />
                <span className="userName">{this.props.user.name}</span>
                <RaisedButton label="Logout" onClick={this.props.signOut} style={buttonStyle}  />
            </div>;

        } else {
            var content = 
            <div>
                <RaisedButton label="Login" onClick={this.props.signIn} style={buttonStyle}  />
            </div>;

        }

        return (
            <header className="App-header">
                <h1 className="App-title">My project title</h1>
                {content}               
            </header>
        )
    }

}

export default Header