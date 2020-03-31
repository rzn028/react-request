import React from 'react';
import logo from './logo.svg';
import './App.css';

var rootDiv = document.getElementById('app');

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


class Form extends React.Component {

    state = {
        history : {},
        headers : {},
        formBody : {},
        jsonBody : null,
        isLoading : false,
    }


    componentDidMount() {
        let history = localStorage.getItem('history');
        history = JSON.parse(history);
        if(history){
            this.setState({history: history});
        }else{
            this.setState({history: {}});
        }
    }

    componentDidUpdate(nextProps, nextState) {

        console.log(nextState.history);
        console.log(this.state.history);
        // if(!Object.is(prevState.history, this.state.history))
        //     console.log(prevState);

        // let history = this.state.history;
        // history = JSON.stringify(history);
        // localStorage.setItem('history', history);
    }

    sendRequest = (e) => {

        this.setState({isLoading:true});
        e.preventDefault();

        let url = e.target.elements.url.value;
        let method = e.target.elements.method.value;

        let options = {
            method: method,
            headers: {
                'Origin': 'http://127.0.0.1:8080',
                'x-requested-with' : 'XMLHttpRequest'

            }
        };
        if(method =='POST'){
            const body = {...this.state.formBody, ...this.state.jsonBody }
            options['body'] = body;
        }

        const proxyurl = "https://tranquil-dawn-42121.herokuapp.com/";
        fetch( proxyurl +url, options)
        .then(res => {
            const contentType = res.headers.get("content-type");
            this.props.setStatus(res.status);
            if (contentType && contentType.indexOf("application/json") !== -1) {                
                this.props.setIsJson(true);
                return res.json();
            }else{
                this.props.setResponse("");
                this.props.setIsJson(false);
                return res.text();
            }
        })
        .catch(err => {
            console.log("Error : " + err);
        })
        .then(res => {
            if(res){

                let history = this.state.history;
                if(history[method]){
                    history[method][url] = options;
                }else{
                    history[method] ={};
                    history[method][url] = options;
                }

                localStorage.setItem('history', JSON.stringify(history));
                this.setState({history: history})
                this.setState({jsonBody: {}});
                this.setState({formBody: {}});
                this.props.setResponse(res);

            }
            this.setState({isLoading:false});
        });
    }


    addHeader = (e) => {
        e.preventDefault();

        const key = e.target.elements.headerKey.value;
        const value = e.target.elements.headerValue.value;

        let headers = this.state.headers;
        headers[key] = value;
        this.setState({headers :headers});
        e.target.elements.headerKey.value = '';
        e.target.elements.headerValue.value = '';
        e.target.elements.headerKey.focus();


    }

    deleteHeaderItem = (headerKey) => {
        
        let headers = this.state.headers;
        delete headers[headerKey];
        this.setState({headers : headers});

    }

    addFormBody = (e) => {
        e.preventDefault();

        const key = e.target.elements.bodyKey.value;
        const value = e.target.elements.bodyValue.value;

        let formBody = this.state.formBody;
        formBody[key] = value;
        this.setState({formBody: formBody});

        e.target.elements.bodyKey.value = '';
        e.target.elements.bodyValue.value = '';
        e.target.elements.bodyKey.focus();

    }

    deleteFormBodyItem = (formBodyKey) => {

        console.log(formBodyKey);
        let formBody = this.state.formBody;
        delete formBody[formBodyKey];

        this.setState({formBody: formBody});
    }

    addJsonBody = (e) => {
        e.preventDefault();

        let jsonBody = e.target.elements.jsonBody.value.toString();
        console.log(jsonBody);
        try{
            jsonBody = JSON.parse(jsonBody);
            this.setState({jsonBody : jsonBody});
        }catch(e){
            alert('Please Provide Valid JSON Body');
        }

    }



    render() {
        return (
            <div>
            <form onSubmit={this.sendRequest} className="urlForm">
                <div className="input-group">
                    <select className="method" name="method">
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="POST">PUT</option>
                    <option value="POST">DELETE</option>

                    </select>
                    <input type="url" class="form-control" placeholder="Enter URL" aria-label="Recipient's username" aria-describedby="button-addon2" name="url" required></input>
                    <div className="input-group-append">
                    <button className="btn btn-outline-success" type="submit">Send</button>
                    </div>
                </div>
            </form>




            <div className="formBody">
                <h6> Request Body </h6> 
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active"  data-toggle="pill" href="#form-data" role="tab" aria-selected="true">Form Data</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="pill" href="#json-body" role="tab" aria-selected="false">JSON Body</a>
                    </li>
                </ul>
                <div className="tab-content">

                    <div className="tab-pane fade show active" id="form-data" role="tabpanel" aria-labelledby="pills-home-tab">
                        {
                            Object.keys(this.state.formBody).map((key) => (
                                <FormBodyItem
                                    formBodyKey={key}
                                    formBodyValue={this.state.formBody[key]}
                                    deleteFormBodyItem={this.deleteFormBodyItem}
                                />
                            ))
                        }                                   
                        <form onSubmit={this.addFormBody} className="addItemForm">
                            <div className="input-group">
                                <input type="text" class="form-control" placeholder="Form Field Name"  name="bodyKey" autocomplete="on" required></input>
                                <input type="text" class="form-control" placeholder="Form Field Value"  name="bodyValue" autocomplete="on" required></input>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-primary" type="submit">Add</button>
                                </div>
                            </div>  
                        </form> 
                    </div>

                    <div className="tab-pane fade" id="json-body" role="tabpanel" >
                        <form onSubmit={this.addJsonBody} >
                            <div className="form-group" style={{marginTop: 20 + 'px'}}>
                                <label ><strong>JSON Body</strong></label>
                                <textarea className="form-control" rows="3" name="jsonBody"></textarea>
                            </div>
                            <button className="btn btn-outline-primary" type="submit">Add Body</button>
                        </form>
                    </div>

                </div>
            </div> 

            <div className="formHeader">
                <h6> Headers </h6> 
                {
                    Object.keys(this.state.headers).map((key) => (
                        <HeaderItem
                            headerKey={key}
                            headerValue={this.state.headers[key]}
                            deleteHeaderItem={this.deleteHeaderItem}
                        />

                    ))
                }           

                <form onSubmit={this.addHeader} className="addItemForm">
                    <div className="input-group">
                        <input type="text" class="form-control" placeholder="Enter header field"  aria-describedby="button-addon2" name="headerKey" autocomplete="on" required></input>
                        <input type="text" class="form-control" placeholder="Enter header field value"  aria-describedby="button-addon2" name="headerValue" autocomplete="on" required></input>
                        <div className="input-group-append">
                            <button className="btn btn-outline-info" type="submit">Add</button>
                        </div>
                    </div>
                </form>
            </div>
            <h5>History</h5>
            {
                Object.keys(this.state.history).map((key) => (
                    <div>
                    <h6>{key} Requests</h6>
                    <pre>
                    {JSON.stringify(this.state.history[key], undefined, 4)}
                    </pre>
                    </div>
                ))
            }  

            { this.state.isLoading && <img src="https://codemyui.com/wp-content/uploads/2017/07/fidget-spinner-loading.gif" class="img-fluid" alt="Responsive image"/>}

            </div>
        );
    }

}

const HeaderItem = (props) => {
    return (

        <div className="input-group">
            <input type="text" class="form-control"  aria-describedby="button-addon2" value={props.headerKey} disabled/>
            <input type="text" class="form-control"  aria-describedby="button-addon2"  value={props.headerValue} disabled/>
            <div className="input-group-append">
                <button 
                    className="btn btn-outline-danger" 
                    onClick = { (e) => {
                        props.deleteHeaderItem(props.headerKey);
                    }}
                >
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>  
    )
}


const FormBodyItem = (props) => {
    return (

        <div className="input-group">
            <input type="text" class="form-control"  value={props.formBodyKey} disabled/>
            <input type="text" class="form-control"  value={props.formBodyValue} disabled/>
            <div className="input-group-append">
                <button 
                    className="btn btn-outline-danger" 
                    onClick = { (e) => {
                        props.deleteFormBodyItem(props.formBodyKey);
                    }}
                >
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>  
    )
}


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



export default MyApp;
