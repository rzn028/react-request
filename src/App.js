import React from 'react';
import './App.css';
import ResultDiv from './components/response/Result'
import Form from './components/form/mainForm'
import Toast from './components/alert/Toast'


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
            <div>
              <div className="container" id="app">
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

              <Toast/>
            </div>
        );
    }
}


export default MyApp;
