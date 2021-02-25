// node libraries
import React from 'react';

// custom libraries
import EiLoading from '../../../components/EiLoading';
import * as DashboardApis from '../../../api/DashboardApis';
import EiDataTable, { EiCol } from '../../../components/ei-data-table';
import { convertObjNumsToHindiChars } from '../../../utils/NumberHelper';

// styles
import './index.css'

export default class OperatorsInputPerformanceTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading:false,
            data:[]
        }
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
            const hindiData = convertObjNumsToHindiChars(result.data);
            console.log(hindiData);
            this.setState({ data : result.data , isLoading : true });
        } catch (err) {
            console.log("Error : ", err);
            this.setState({ data : [] , isLoading : true });
        }
        this.setState({ isLoading : false });
    }

    render() {
        return (
            <div style={{ width: '100%', position: "relative" }} className={this.props.className}>
                <EiLoading isLoading={this.state.isLoading} />

                <EiDataTable data={this.state.data}>
                    <EiCol fieldName='AgentId' title="Agent Id"></EiCol>
                    <EiCol fieldName='AllCallsCount' title='All Calls'></EiCol>
                    <EiCol fieldName='AverageDuration' title='Average Call Duration'></EiCol>
                    <EiCol fieldName='MaxDuration' title='Max of call duration'></EiCol>
                    <EiCol fieldName='AverageWait' title='Average of wait time'></EiCol>
                    <EiCol fieldName='MaxWait' title='Max of wait time'></EiCol>
                    <EiCol fieldName='ConnectedCallsCount' title='Accepted calls'></EiCol>
                    <EiCol fieldName='DisconnectedCallsCount' title='Rejected calls'></EiCol>
                </EiDataTable>
            </div>
        )
    }
}