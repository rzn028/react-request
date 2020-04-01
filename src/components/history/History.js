import React from 'react';

class History extends React.Component{
    render(){
        return (
            <div>
            <h5>History</h5>
            {
                Object.keys(this.props.history).map((method) => (
                    <div className="historyDiv">
                    <h6>{method} Requests</h6>
                    {
                    Object.keys(this.props.history[method]).map((url) => (
                        <HistoryItem
                            method={method}
                            url={url}
                            removeHistoryItem={this.props.removeHistoryItem}
                            addFromHistoryItem={this.props.addFromHistoryItem}
                        />
                    ))
                    }
                    </div>
                ))
            } 
            </div> 
        );
    }
}


const HistoryItem = (props) => {


    return(

        <div className="alert alert-success" role="alert">
            <a href="#" 
            className="alert-link"
            onClick={ (e) => {
                e.preventDefault();
                props.addFromHistoryItem(props.method, props.url)
            }}
            ><strong>{props.method} : </strong> {props.url}</a>
            <button 
            type="button" 
            className="close"
            onClick={ (e) => {
                e.preventDefault();
                props.removeHistoryItem(props.method, props.url)
            }}
            >
                <span aria-hidden="true">&times;</span>
          </button>
        </div>
        
    )
}

export default History;