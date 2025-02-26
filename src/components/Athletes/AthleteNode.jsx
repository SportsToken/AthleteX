import React from 'react';

export function AthleteNode(props) {
    return (
        <tr>
        <td>{props.name}</td>
        <td>{props.price}</td>
        <td>{props.sport}</td>
        <td className="text-center">{props.btn}</td>
      </tr>
    );
}