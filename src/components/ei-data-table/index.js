import React from 'react';

import './index.css';

const EiCol = (props) => {
    return null;
}

export { EiCol }

export default class EiDataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div className="ei-data-table">
                <table>
                    <thead>
                        <tr>
                            {this.props.children.map( (headCell, headIndex) => (
                                <th key={"headCell" + headIndex}>
                                    { headCell.props.title }
                                </th>
                            ) )}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map( (record, rowIndex) => (
                            <tr key={"row" + rowIndex}>
                                {Object.keys(record).map( (cell, colIndex) => (
                                    <td key={"col"+colIndex}>
                                        {record[cell]}
                                    </td>
                                ) )}
                            </tr>
                        )) }
                    </tbody>
                </table>

                {/* Footer Div */}
                <div></div>
            </div>
        );
    }
}