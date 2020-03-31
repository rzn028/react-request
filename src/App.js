import React from 'react';
import './App.css';
import ResultDiv from './components/response/Result'
import Form from './components/form/mainForm'


class MyApp extends React.Component {

    state = {
        response: null,
        statusCode:null,
        isJson: null
    }

    setResponse = (_resp) => {
        this.setState({
            response: _resp,
        });
    }
    setStatus = (_statusCode) => {
        this.setState({
            statusCode : _statusCode
        });
    }
    setIsJson = (_isJson) => {
        this.setState({
            isJson : _isJson
        });
    }

    render() {
        return (
            <div className="container">
                <Form
                    setResponse={this.setResponse} 
                    setStatus={this.setStatus}
                    setIsJson={this.setIsJson}
                />
                <ResultDiv
                    response={this.state.response}  
                    status={this.state.statusCode}
                    isJson={this.state.isJson}
                />
            </div>
        );
    }
}


export default MyApp;
