import React from "react";
import {connect} from 'react-redux';
import {signIn, signOut} from '../Actions';

class GoogleAuth extends React.Component{
   
    componentDidMount(){
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId:'44779489178-oug6sbij564lhi2anrhi2r74gprc2ko0.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth= window.gapi.auth2.getAuthInstance(); 
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
                
            })
        }); 
    }
    onAuthChange=(isSignedIn)=>{
        if(isSignedIn){
            this.props.signIn( this.auth.currentUser.get().getId());
        }
        else{
            this.props.signOut();
        }
    }
    onSignedInClick=()=>{
        this.auth.signIn();

    };
    onSignedOutClick=()=>{
        this.auth.signOut();
    };
    renderAuthBtn(){
        if(this.props.isSignedIn===null){
            return null;
        }
        else if(this.props.isSignedIn===true) {
            return (
                <button onClick={this.onSignedOutClick} className="ui red google button">
                    <i className="ui google icon"></i>
                    SignOut 
                </button>
            )

        }
        else{
            return (
                <button onClick={this.onSignedInClick} className="ui red google button">
                    <i className="ui google icon"></i>
                    SignIn 
                </button>
            )
        }
    }
    render(){
        return(
            <div>{this.renderAuthBtn()}</div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {isSignedIn:state.auth.isSignedIn};
}

export default connect(mapStateToProps,{signIn, signOut })(GoogleAuth);