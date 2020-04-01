import React from 'react';

class Toast extends React.Component{
    render(){

        const wrapperToast = {
            position : "relative",
            minHeight : "200px"
        };

        const childWapperToast = {
            position: "absolute",
            top: '0',
            right: '0'
        }

        return (
            <div style={wrapperToast}>
                <div style={childWapperToast}>

                <ToastItem/>
                <ToastItem/>


                </div>
            </div>

        );
    }
}


const ToastItem = (props) => {

    return(
        <div className="toast" data-delay="5000" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <img src="..." className="rounded mr-2" alt="..."/>
                <strong className="mr-auto">Bootstrap</strong>
                <small className="text-muted">2 seconds ago</small>
                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="toast-body">
                Heads up, toasts will stack automatically
            </div>
        </div>
    )

}

export default Toast;