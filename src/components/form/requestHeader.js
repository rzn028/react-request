import React from 'react';

class FormHeader extends React.Component {

    render() {
        return (
            <div className="formHeader">
                <h6> Headers </h6> 
                {
                    Object.keys(this.props.headers).map((key) => (
                        <HeaderItem
                            headerKey={key}
                            headerValue={this.props.headers[key]}
                            deleteHeaderItem={this.props.deleteHeaderItem}
                        />
                    ))
                }           

                <form onSubmit={this.props.addHeader} className="addItemForm">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Enter header field"  aria-describedby="button-addon2" name="headerKey" autoComplete="on" required></input>
                        <input type="text" className="form-control" placeholder="Enter header field value"  aria-describedby="button-addon2" name="headerValue" autoComplete="on" required></input>
                        <div className="input-group-append">
                            <button className="btn btn-outline-info" type="submit">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}


const HeaderItem = (props) => {
    return (
        <div className="input-group">
            <input type="text" className="form-control"  aria-describedby="button-addon2" value={props.headerKey} key={props.headerKey} disabled/>
            <input type="text" className="form-control"  aria-describedby="button-addon2"  value={props.headerValue} key={props.headerValue} disabled/>
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

export default FormHeader;