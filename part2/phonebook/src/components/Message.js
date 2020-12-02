import React from 'react';

const Message = ({ message, success }) => {
    const divStyle = {
        color: success ? 'green' : 'red',
        background: success ? 'lightgoldenrodyellow': 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };
    if(!message) return null;
    return (
        <div style={divStyle}>{message}</div>
    );
};

export default Message;