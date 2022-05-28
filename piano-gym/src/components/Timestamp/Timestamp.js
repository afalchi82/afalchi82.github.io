import React from 'react';

import './Timestamp.css';

export default () => {
    const now = new Date().toString();

    return <div className='timestamp'>{ now }</div>
};