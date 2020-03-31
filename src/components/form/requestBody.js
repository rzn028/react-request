import React from 'react';

class FormBody extends React.Component {
    render() {
        return (
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
                            
                            Object.keys(this.props.formBody).map((key) => (
                                <FormBodyItem
                                    formBodyKey={key}
                                    formBodyValue={this.props.formBody[key]}
                                    deleteFormBodyItem={this.props.deleteFormBodyItem}
                                />
                            ))
                        }                                   
                        <form onSubmit={this.props.addFormBody} className="addItemForm">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Form Field Name"  name="bodyKey" autoComplete="on" required></input>
                                <input type="text" className="form-control" placeholder="Form Field Value"  name="bodyValue" autoComplete="on" required></input>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-primary" type="submit">Add</button>
                                </div>
                            </div>  
                        </form> 
                    </div>
                
                    <div className="tab-pane fade" id="json-body" role="tabpanel" >
                        <form onSubmit={this.props.addJsonBody} >
                            <div className="form-group" style={{marginTop: 20 + 'px'}}>
                                <label ><strong>JSON Body</strong></label>
                                <textarea className="form-control" rows="3" name="jsonBody"></textarea>
                            </div>
                            <button className="btn btn-outline-primary" type="submit">Add Body</button>
                        </form>
                    </div>
        
                </div>
            </div> 
        )
    }
}


const FormBodyItem = (props) => {
    return (

        <div className="input-group">
            <input type="text" className="form-control"  value={props.formBodyKey} key={props.formBodyKey} disabled/>
            <input type="text" className="form-control"  value={props.formBodyValue} key={props.formBodyValue} disabled/>
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


export default FormBody;