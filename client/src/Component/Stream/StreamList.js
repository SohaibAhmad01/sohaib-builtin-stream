import React from "react";
import { connect } from "react-redux";
import Link from "react-router-dom/Link";
import { fetchStreams } from "../../Actions";

class StreamList extends React.Component{

    componentDidMount(){
        this.props.fetchStreams();  
    };
    renderAdmin(stream){
        if(stream.userId=== this.props.currentUserId){
            return(
                 <div className="right floated content">
                     <Link to={`/Streams/edit/${stream.id}`} className="ui primary button">
                         Edit
                     </Link>
                     <Link to={`/Streams/delete/${stream.id}`} className="ui negative button">
                         Delete
                     </Link>
                     
                </div>
                );
        }
    }
    renderList(){
        return this.props.streams.map(stream =>{
            return(
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)} 
                    <i className="large middle aligned  camera icon"></i>
                    <div className="content">
                        <Link to={`/Streams/${stream.id }`} className="header">
                        {stream.title}
                        </Link>
                        
                        <div className="description">{stream.description}</div>
                    </div>
                    
                </div>

            );
        })
    }
    renderCreate(){
        if(this.props.isSignedIn){
            return(
                <div style={{textAlign: 'right'}}>
                    <Link to="/Streams/new" className="ui primary button"> Create Stream</Link>
                </div>
            )
        }
    }
    
    render(){
       
        return(
             <div>
                <h2>Stream</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        streams: Object.values(state.stream),
        currentUserId:state.auth.userId,
        isSignedIn:state.auth.isSignedIn
    };

}
export default connect(mapStateToProps,{fetchStreams})(StreamList);