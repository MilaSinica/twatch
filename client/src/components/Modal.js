import React from 'react';
import ReactDom from 'react-dom';

const Modal = ({children, onOutsideClick}) => {
    //reactDom method to render component inside another component not parent - portal. 2 args - component and target parent
    return ReactDom.createPortal(
        <div className="ui dimmer modals visible active" onClick={onOutsideClick}>
            <div className="ui standard modal visible active" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,

        document.getElementById("modal")
    )
}

export default Modal;