import React from 'react';

import EiLoading from '../../../components/EiLoading';
import * as DashboardApis from '../../../api/DashboardApis';
import * as NumberHelpers from '../../../utils/NumberHelper';

import Icon1 from '../../../assets/svgs/wallboard/AllCalls';
import Icon2 from '../../../assets/svgs/wallboard/IncommingCall';
import Icon3 from '../../../assets/svgs/wallboard/missedCall';
import Icon4 from '../../../assets/svgs/wallboard/hourGlass';
import Icon5 from '../../../assets/svgs/wallboard/hourGlass';
import Icon6 from '../../../assets/svgs/wallboard/conversation';
import Icon7 from '../../../assets/svgs/wallboard/conversation';
import Icon8 from '../../../assets/svgs/wallboard/voiceMail';

import "./index.css";

const SingleStatItem = (props) => (
    <div className={`ei-xl-4 ei-lg-4 ei-md-6 ei-sm-6 ei-col-6 stats-icon icon-color${props.index}`} >
        <div className="ei-col-2">
            {props.icon}
        </div>
        <div className="ei-col-10">
            <div className="value">
                {props.value}
            </div>
            <div className="title">
                {props.title}
            </div>
        </div>        
    </div>
)

class SingleStats extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allIncome : 0,
            connectedCalls:0,
            disconnectedCalls:0,
            averageWaitTime:0,
            maxWaitTime:0,
            averageCallDuration:0,
            maxCallDuration:0,
            voiceMails:0,

            isLoading: false,
        }
    }

    readSingleStats = async (input) => {
        this.setState({ isLoading : true });
        try {
            //setTimeout( async () => {
                const result = await DashboardApis.getSingleStats(this.props.fromDate, this.props.toDate);
                //console.log("Single Stats Result", result.data);
                const r = result.data;
                this.setState({...r , isLoading: true});
            //}, 2000); // Make manual delay to see loader spinner
            
        } catch (err) {
            console.log("Error : ", err);
        }
        this.setState({ isLoading : false });
    }

    componentDidMount() {
        this.readSingleStats();
    }

    componentDidUpdate(prevProps){
        if(prevProps.fromDate !== this.props.fromDate || prevProps.toDate !== this.props.toDate)
            this.readSingleStats();
    }

    render() {
        const s = this.state;
        return (
            <div className="ei-row">
                <EiLoading isLoading={this.state.isLoading} />

                <SingleStatItem 
                    index={1} 
                    value={NumberHelpers.convertNumToHindiChar(s.allIncome) + " Calls"}
                    icon={<Icon1 />}
                    title="Total queue input"
                />
                
                <SingleStatItem 
                    index={2} 
                    value={NumberHelpers.convertNumToHindiChar(s.connectedCalls) + " Calls"}
                    icon={<Icon2 />}
                    title="Answered calls"
                />

                <SingleStatItem 
                    index={3} 
                    value={NumberHelpers.convertNumToHindiChar(s.disconnectedCalls) + " Calls"}
                    icon={<Icon3 />}
                    title="Disconnected calls"
                />

                <SingleStatItem 
                    index={4} 
                    value={NumberHelpers.convertNumToHindiChar(s.averageWaitTime) + " Second"}
                    icon={<Icon4 />}
                    title="Average of waiting time"
                />

                <SingleStatItem 
                    index={5} 
                    value={NumberHelpers.convertNumToHindiChar(s.maxWaitTime) + " Second"}
                    icon={<Icon5 />}
                    title="Max of waiting time"
                />

                <SingleStatItem 
                    index={6} 
                    value={NumberHelpers.convertNumToHindiChar(s.averageCallDuration) + " Second"}
                    icon={<Icon6 />}
                    title="Average of call duration"
                />
                
                <SingleStatItem 
                    index={7} 
                    value={NumberHelpers.convertNumToHindiChar(s.maxCallDuration) + " Second"}
                    icon={<Icon7 />}
                    title="Max of call duration"
                />
                
                <SingleStatItem 
                    index={8} 
                    value={NumberHelpers.convertNumToHindiChar(s.voiceMails) + " Calls"}
                    icon={<Icon8 />}
                    title="Voice Mail count"
                />
            </div>
        )
    }
}

export default SingleStats;