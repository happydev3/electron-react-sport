import React, { Component } from 'react';
import { Popover } from 'react-bootstrap';

const PopOver = (props) => {
    return (
        <Popover id="popover-basic">
            <Popover.Content>
                {props.message}
            </Popover.Content>
        </Popover>
    )
}

export default PopOver;