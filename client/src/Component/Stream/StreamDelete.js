import React from "react";
import Modal from "../Modal";
import History from "../../History";
import {connect} from 'react-redux';
import {fetchStream, deleteStream} from '../../Actions';
import {Link} from 'react-router-dom';

class StreamDelete extends React.Component {
    componentDidMount(){
       this.props.fetchStream( this.props.match.params.id);
    }
    renderAction(){
        const {id}= this.props.match.params;
    return(
        <React.Fragment>
            <button className="ui negative button" onClick={()=>this.props.deleteStream(id)}> DELETE</button>
            <Link to='/' className=" ui button">Cancel</Link>
        </React.Fragment>
    );
    }
    renderContent(){
        if(!this.props.stream){
            return 'Are you sure to delete the stream?'
        }
        return `Are you sure to delete the stream:${this.props.stream.title}`
    }
   render() {
        return(
            
                <Modal
                     title="Delete Stream"
                     content={this.renderContent()}
                     onDismiss={()=>History.push('/')}
                     action={this.renderAction()}
    
    
                />
        )
     
   }
}
const mapStateToProps=(state, ownProps)=>{
    return {stream:state.stream[ownProps.match.params.id]}
};

export default connect(mapStateToProps,{fetchStream, deleteStream}) (StreamDelete);