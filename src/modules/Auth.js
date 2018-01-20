import React, { Component } from 'react';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';

class Auth extends Component {

    constructor(props){
        super(props);

        this.init();

        this.state = {}
    }
    
    init(){
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                this.userIsLoggedIn(user);
            } else {
                this.userIsNotLoggedIn();
            }
        });
    }
    
    userIsNotLoggedIn(){

        this.setState({
            loggedIn : false
        });
    }

    userIsLoggedIn(user){
        console.log("Hello " + user.displayName);
        
        var userDB = this.getDBUser(user.uid).then((res)=>{

            this.setState({
                loggedIn : true,
                user : {
                    name : user.displayName,
                    photo : user.photoURL,
                    pushNotification : res.val() ? res.val().pushNotification : true
                }
            });
        });

    }

    getDBUser = (uid) => {
        return firebase.database().ref('/users/' + uid).once('value')
        
    }

    createDBUser = (user) => {

        firebase.database().ref('/users/' + user.uid).once('value').then((snapshot) => {
            var exists = snapshot.val() !== null;

            if(!exists){

                firebase.database().ref('users/'+ user.uid).set({
                    username : user.displayName,
                    email : user.email,
                    photoURL : user.photoURL,
                    pushNotification : { enabled: false }
                });

            }
        });

    }
    
    signIn = () => {
        firebase.auth().useDeviceLanguage();
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(()=>{
            return firebase.auth().signInWithPopup(provider)
                .then((res)=>{ 
                    this.createDBUser(res.user);
                })
                .catch((error)=>{
                    console.log(error);
                });
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    signOut(){
        firebase.auth().signOut().then(()=>{
            // this.userIsNotLoggedIn();  
        }).catch(function(error) {
            console.log(error);
        });
    }

    getLoggedUser(){
        var user = firebase.auth().currentUser;
        return user && user.length
    }
    
    render(){        
        const buttonStyle = {
            margin: 20
        }

        const childrenWithProps = React.Children.map(this.props.children,
            (child) => <child.type 
                loggedIn = {this.state.loggedIn}
                user = {this.state.user}
                signIn = {this.signIn}
                signOut = {this.signOut} />
        );

        return(
            <div>
                {childrenWithProps}
            </div>
        );
    }

}

export default Auth