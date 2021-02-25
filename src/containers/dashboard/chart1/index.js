import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';

import EiLoading from '../../../components/EiLoading';
import * as DashboardApis from '../../../api/DashboardApis';
import * as NumberHelpers from '../../../utils/NumberHelper';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

/*const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};*/

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        {/* <text x={cx} y={cy} dy={8} textAnchor="middle" fill={'#FFF'}>{payload.name}</text> */}
        <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius+3}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
        />
        <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#000">
            {/* {`(${value} - ${(percent * 100).toFixed(2)}%)`} */}
            {`(${NumberHelpers.convertNumToHindiChar(value)})`}
        </text>
      </g>
    );
};

export default class Chart1 extends React.PureComponent {
    state = {
        activeIndex: 0,
        isLoading:false,
        distributedCallsData:[]
    }

    readDistributedCalls = async (input) => {
        this.setState({ isLoading : true });
        try {
            //setTimeout( async () => {
                const result = await DashboardApis.readDistributedCalls(this.props.fromDate, this.props.toDate);
                const r = result.data;
                this.setState({distributedCallsData:r , isLoading : true});
            //}, 1000); // Make manual delay to see loader spinner
            
        } catch (err) {
            console.log("Error : ", err);
        }
        this.setState({ isLoading : false });
    }

    componentDidMount() {
        this.readDistributedCalls();
    }

    componentDidUpdate(prevProps){
        if(prevProps.fromDate !== this.props.fromDate || prevProps.toDate !== this.props.toDate)
            this.readDistributedCalls();
    }

    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    };
    
    render() {
        return (
            <div style={{ width: '100%', height: 225, position: "relative" }}>
                <EiLoading isLoading={this.state.isLoading} />

                <ResponsiveContainer> 
                    <PieChart onMouseEnter={this.onPieEnter}>
                        <Pie 
                            data={this.state.distributedCallsData} 
                            activeIndex={this.state.activeIndex}
                            activeShape={renderActiveShape}
                            
                            labelLine={false}
                            // label={renderCustomizedLabel}
                            //label 
                            innerRadius={0}
                            outerRadius={60}
                            fill="#8884d8"
                            dataKey="value" 
                            onMouseEnter={this.onPieEnter}
                        >
                            {
                                this.state.distributedCallsData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        )
    }
}