// node libraries
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

// custom libraries
import * as DashboardApis from '../../../api/DashboardApis';
import * as NumberHelpers from '../../../utils/NumberHelper';
import EiLoading from '../../../components/EiLoading';
// import { getDarkerColor } from '../../../utils/ColorHelper'

// styles
import './index.css';

// place circle of values, in front of bars
const renderCustomizedLabel = (props) => {
    const {
      x, y, width, height, value,
    } = props;
    // console.log(props);
    const radius = height/2 - 4;
    // const size = 23;
  
    return (
      <g>
        <circle cx={x + width - radius - 5} cy={y + height/2} r={radius} fill="#fff" />
        {/* <rect x={x + width - size - 2} y={y + 2} width={size} height={size} fill="#fff" />     */}
        {/* <text x={x + width - radius } y={y + height - radius / 2 - 4} fill="#0c7beb" textAnchor="middle" dominantBaseline="middle"> */}
        <text x={x + width - radius - 5} y={y + height - 1*radius-1 } fill="#999" textAnchor="middle" dominantBaseline="middle">
            { NumberHelpers.convertNumToHindiChar(value) }
        </text>
      </g>
    );
};

export default class OperatorsInputPerformanceChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading:false,
            data:[]
        }

        this.getHindiLabel = this.getHindiLabel.bind(this);
    }

    componentDidMount() {
        this.readOperatorsPerformance();
    }

    componentDidUpdate(prevProps){
        if(prevProps.fromDate !== this.props.fromDate || prevProps.toDate !== this.props.toDate)
            this.readOperatorsPerformance();
    }

    readOperatorsPerformance = async () => {
        this.setState({ isLoading : true });
        try {
            const result = await DashboardApis.readOperatorsInputPerformance(this.props.fromDate, this.props.toDate);
            //console.log("BeforeConvert:", result.data);
            this.setState({ data : result.data , isLoading : true });
        } catch (err) {
            console.log("Error : ", err);
        }
        this.setState({ isLoading : false });
    }

    enLabels = [
        'AgentId',
        'AllCallsCount',
        'ConnectedCallsCount',
        'DisconnectedCallsCount',
        // 'averageWaitTime',
        // 'maxWaitTime',
        // 'averageCallDuration',
        // 'maxCallDuration',
    ]

    hindiLabels = [
        'संचालक संख्या ',
        'सभी कालेँ ',
        'कनेक्टेड कॉल ',
        'असंबद्ध कॉल ',
        // 'औसत प्रतीक्षा समय ',
        // 'अधिकतम प्रतीक्षा समय ',
        // 'औसत कॉल समय ',
        // 'अधिकतम कॉल समय ',
    ]

    colors = [
        "#0c7beb",
        "#8884d8",
        "#82ca9d",
        "#72b3db",
        "#b6c953",
        "#e6b673",        
    ]

    getHindiLabel = (enLabel) => {
        let index = this.enLabels.indexOf(enLabel);
        return (index === -1 ? 'False' : this.hindiLabels[index]);
    }

    // convert diagram names, to Hindi names
    //TODO: fetch Hindi titles from back-end
    renderHindiLegendText = (value, entry) => {
        const { color } = entry;
        const hindiLabel = this.getHindiLabel(value);
      
        return <span style={{ color }}>{hindiLabel}</span>;
    }

    CustomTooltip = ({ active, payload, label }) => {
        //console.log(payload,label);
        if (active && payload) {
            return (
                <div className="ei-tooltip-panel">
                    <p className="label">Operator number {`${NumberHelpers.convertNumToHindiChar(label)}`}</p>
                    <ul>
                    { payload.map( (p,i) => (
                        <li key={"k"+i} style={{ color: p.color }}>{ this.getHindiLabel(p.name) + ' :\t\t' + NumberHelpers.convertNumToHindiChar(p.value)}</li>
                    ))}
                    </ul>
                </div>
            );
        }
      
        return null;
    };

    render() {
        return (
            <div style={{ width: '100%', height: 300, position: "relative" }}>
                <EiLoading isLoading={this.state.isLoading} />
                
                <ResponsiveContainer> 
                    <BarChart
                        data={this.state.data}
                        layout='vertical'
                        reverseStackOrder={true}
                    >
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis 
                            label={{ value: 'Call Number', position: 'insideBottomLeft', offset: 0 }} 
                            type='number'
                        />
                        <YAxis 
                            dataKey="AgentId" type='category' //orientation='right' 
                            //label={{ value: 'Operators', angle:-90 , position: 'insideRight' }}
                            reversed={true}
                        />
                        <Tooltip content={ <this.CustomTooltip /> } />
                        <Legend 
                            verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} iconType='circle'
                            formatter={ this.renderHindiLegendText }
                        />

                        <Bar dataKey="AllCallsCount" fill={this.colors[0]} layout='vertical'>
                            <LabelList dataKey="AllCallsCount" content={renderCustomizedLabel} />
                        </Bar>
                        <Bar dataKey="ConnectedCallsCount" stackId="a" fill={this.colors[1]} layout='vertical' >
                            <LabelList dataKey="ConnectedCallsCount" content={renderCustomizedLabel} />
                        </Bar>
                        <Bar dataKey="DisconnectedCallsCount" stackId="a" fill={this.colors[2]} layout='vertical' >
                            <LabelList dataKey="DisconnectedCallsCount" content={renderCustomizedLabel} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>                

            </div>
        );
    }
}