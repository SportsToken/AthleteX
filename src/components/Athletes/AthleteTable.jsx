import {
    Table
} from 'reactstrap';
import React from 'react';
import { AthleteNode } from './AthleteNode';

export function AthleteTable(props) {
    return (
        <Table className="tablesorter" >
        <thead className="text-primary">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Sport</th>
            <th className="text-center">Buy/Sell</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </Table>
    );
}