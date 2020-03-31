import React from 'react';

class ResultDiv extends React.Component {

    render() {
        return (
            <div>
            <h3>Response Body</h3>
            <h6> Status Code : {this.props.status} </h6> 
                <pre id="response">
                    { this.props.response && this.props.isJson && JSON.stringify(this.props.response, undefined, 4) } 
                    { this.props.response && !this.props.isJson && this.props.response} 

                </pre>
            </div>
        )   
    }
}

export default ResultDiv;