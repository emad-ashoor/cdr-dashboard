// node libraries
import React from 'react';

// custom libraries
import EiLoading from '../../../components/EiLoading';
import * as DashboardApis from '../../../api/DashboardApis';
import EiDataTable, { EiCol } from '../../../components/ei-data-table';
import { convertObjNumsToHindiChars } from '../../../utils/NumberHelper';

// styles
import './index.css'

export default class OperatorsOutputPerformanceTable extends React.Component {
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
            const result = await DashboardApis.readOperatorsOutputPerformance(this.props.fromDate, this.props.toDate);
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
                    <EiCol fieldName='AllCallsCount' title="All Calls Count"></EiCol>
                    <EiCol fieldName='TotalDuration' title="Total Call Duration"></EiCol>
                    <EiCol fieldName='AverageDuration' title="Average Call Duration"></EiCol>
                    <EiCol fieldName='MaxDuration' title="Max Call Duration"></EiCol>
                    <EiCol fieldName='InternalCallsCount' title="Internal Calls Count"></EiCol>
                    <EiCol fieldName='InternalTotalDuration' title="Internal Total Duration"></EiCol>
                    <EiCol fieldName='InTownCallsCount' title="Intercity Calls Count"></EiCol>
                    <EiCol fieldName='InTownTotalDuration' title="Intercity Total Duration"></EiCol>
                    <EiCol fieldName='SuburbanCallsCount' title="Suburban Calls Count"></EiCol>
                    <EiCol fieldName='SuburbanTotalDuration' title="Suburban Total Duration"></EiCol>
                    <EiCol fieldName='InternationalCallsCount' title="International Calls Count"></EiCol>
                    <EiCol fieldName='InternationalTotalDuration' title="International Total Duration"></EiCol>
                    <EiCol fieldName='MobileCallsCount' title="Mobile Calls Count"></EiCol>
                    <EiCol fieldName='MobileTotalDuration' title="Mobile Total Duration"></EiCol>
                </EiDataTable>
            </div>
        )
    }
}