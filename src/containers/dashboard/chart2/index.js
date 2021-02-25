// node libraries
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

// containers & components

// styles


class Chart2 extends React.Component {
    data = [
        {name: 'Page A', uv: 400, pv: 2400, amt: 2400}, 
        {name: 'Page B', uv: 300, pv: 2400, amt: 2400},
        {name: 'Page C', uv: 300, pv: 2400, amt: 2400},
        {name: 'Page D', uv: 200, pv: 2400, amt: 2400},
        {name: 'Page E', uv: 280, pv: 2400, amt: 2400}
    ];

    render() {
        return (
            <LineChart width={400} height={200} data={this.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
        );
    }
}
export default Chart2;
