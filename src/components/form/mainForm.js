import React from 'react';
import FormHeader from './requestHeader';
import FormBody from './requestBody';


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
        if(method === 'POST'){
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
                    <input type="url" className="form-control" placeholder="Enter URL" aria-label="Recipient's username" aria-describedby="button-addon2" name="url" required></input>
                    <div className="input-group-append">
                    <button className="btn btn-outline-success" type="submit">Send</button>
                    </div>
                </div>
            </form>

            <FormBody
                formBody={this.state.formBody}
                jsonBody={this.state.jsonBody}
                addFormBody={this.addFormBody}
                addJsonBody={this.addJsonBody}
                deleteFormBodyItem={this.deleteFormBodyItem}
            />

            <FormHeader
                headers={this.state.headers}
                addHeader={this.addHeader}
                deleteHeaderItem={this.deleteHeaderItem}
            />

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

            { this.state.isLoading && <img src="https://codemyui.com/wp-content/uploads/2017/07/fidget-spinner-loading.gif" className="img-fluid" alt="Loading-gif"/>}

            </div>
        );
    }

}

export default Form;