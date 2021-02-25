// node libraries
import React from 'react';
/*import { 
    Formik, Form, 
    //Field, ErrorMessage 
} from 'formik';*/
import { DateTimePicker } from "react-advance-jalaali-datepicker2";
import Switch from "react-switch";
import moment from 'jalali-moment';

// custom libraries
import EiPanel from '../../components/EiPanel';
//import * as NumberHelpers from '../../utils/NumberHelper';
import SingleStats from './single-stats'
import Chart1 from './chart1';
import OperatorsOutputPerformanceChart from './opr-out-perf-chart';
import OperatorsOutputPerformanceTable from './opr-out-perf-table';
import OperatorsInputPerformanceChart from './opr-in-perf-chart';
import OperatorsInputPerformanceTable from './opr-in-perf-table';

// styles
import './index.css';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        if (!Date.now) {
            Date.now = function() { return new Date().getTime(); }
        }

        //console.log(NumberHelpers.convertNumToHindiChar(moment().locale('fa').format('YYYY/M/D')));

        this.state = {
            //fromDate: NumberHelpers.convertNumToHindiChar(moment().locale('fa').format('YYYY/M/D')),
            //toDate: NumberHelpers.convertNumToHindiChar(moment().locale('fa').format('YYYY/M/D')),
            fromDate: moment().locale('fa').format('YYYY/M/D'),
            toDate: moment().locale('fa').format('YYYY/M/D'),
            fromDateTimeStamp : Date.now(),
            toDateTimeStamp : Date.now(),
            isInputReport: true
        }

        //this.change.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({ isInputReport:checked });
    }

    resetForm = () => {
        const defaultDate = moment().locale('fa').format('YYYY/M/D');
        // const defaultDate = "1398/11/21";
        // console.log("typeof date = ", typeof defaultDate , defaultDate);
        this.setState({
            fromDate: defaultDate,
            toDate: defaultDate,
            fromDateTimeStamp : Date.now(),
            toDateTimeStamp : Date.now(),
        });
        console.log("NewState: ", this.state);
    }
    
    validateSearchForm = (values) => {
        //alert('validate', values);
        const errors = {};
        if(! values.fromDate)
            errors.fromDate = "Start date should be entered";
        if(! values.toDate)
            errors.toDate = "End date should be entered";
        return errors;
    }

    submitSearchForm = (values) => {
        alert('submit', this.state.fromDate, this.state.toDate);
    }

    changeFromDate(unix, formatted) {
        this.setState({
            //fromDate: formatted.replace("/","").replace("/","")
            fromDateTimeStamp: unix
        })
    }

    changeToDate(unix, formatted) {
        this.setState({
            //toDate: formatted.replace("/","").replace("/","")
            toDateTimeStamp: unix
        })
    }

    FromDatePickerInput(props) {
        //console.log("DP props", props);
        return <input className="ei-input" {...props} />;
    }

    ToDatePickerInput(props) {
        return <input name="toDate" className="ei-input" {...props} />;
    }

    render() {
        return (
            <div>
                <div className="ei-row">
                    <div className="ei-col-6 top-title">Reports</div>
                    <div className="ei-col-6 refresh-combo">
                    </div>
                </div>

                <EiPanel size="12" title="">
                    <div className="ei-row">
                        <div className="search-title ei-col-12">Search based on</div>
                        <div className="ei-col-12">
                            {/* <Formik
                                //initialValues = {{ email: '', firstName: '' }}
                                initialValues = {{ fromDate: '', toDate: '' }}
                                validate={this.validateSearchForm}
                                onSubmit={this.submitSearchForm}
                            >
                                { ({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
                                    <Form> */}
                                        {/* <Field type="email" name="email" />
                                        <ErrorMessage name="email" component="div"></ErrorMessage>

                                        <input
                                            type="text"
                                            name="firstName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.firstName}
                                        />
                                        {errors.firstName && touched.firstName && errors.firstName} */}

                                        <div className="ei-col-12 ei-sm-6 ei-md-6 ei-lg-4">
                                            <DateTimePicker
                                                inputComponent={this.FromDatePickerInput}
                                                placeholder="From Date"
                                                format="jYYYY/jMM/jDD"
                                                onChange={this.changeFromDate.bind(this)}
                                                cancelOnBackgroundClick={true}
                                                id="fromDatePicker"
                                                // value={this.state.fromDate}
                                                preSelected = { this.state.fromDate }
                                                controllValue={true}
                                            />
                                        </div>

                                        <div className="ei-col-12 ei-sm-6 ei-md-6 ei-lg-4">
                                            <DateTimePicker
                                                inputComponent={this.ToDatePickerInput}
                                                placeholder="To Date"
                                                format="jYYYY/jMM/jDD"
                                                onChange={this.changeToDate.bind(this)}
                                                cancelOnBackgroundClick={true}
                                                id="toDatePicker"
                                                preSelected = { this.state.toDate }
                                                controllValue={true}
                                            />
                                        </div>
                                        
                                        <div className="ei-col-12 ei-sm-12 ei-md-12 ei-lg-4">
                                            {/* <button type="submit" className="ei-btn" disabled={false}>Search</button> */}
                                            <button type="reset" className="ei-btn" style={{ fontSize: "11px" }} disabled={false}
                                                onClick={this.resetForm.bind(this)}
                                            >
                                                Today
                                            </button>
                                        </div>
                                    {/* </Form>
                                )}
                            </Formik> */}
                        </div>
                    </div>
                </EiPanel>

                <EiPanel size="12" smsize="7" mdsize="7" lgsize="7" xlsize="7" title="Queue status report">
                    <SingleStats fromDate={this.state.fromDateTimeStamp} toDate={this.state.toDateTimeStamp} />
                </EiPanel>

                <EiPanel size="12" smsize="5" mdsize="5" lgsize="5" xlsize="5" title="Distributed calls">
                    <Chart1 fromDate={this.state.fromDateTimeStamp} toDate={this.state.toDateTimeStamp} />
                </EiPanel>

                <EiPanel size="12" smsize="12" mdsize="12" lgsize="12" xlsize="12" title="Employee performance details">
                    <div className="ei-call-type-switch-wrapper">
                        <label htmlFor="call-type-switch">
                            <span>Select type of call : </span>
                            <div className="ei-switch-wrapper">
                                <Switch
                                    handleDiameter={20}
                                    offColor="#08f"
                                    onColor="#9100ff"
                                    offHandleColor="#003078"
                                    onHandleColor="#590076"
                                    height={30}
                                    width={85}
                                    checked={this.state.isInputReport}
                                    onChange={this.handleChange}
                                    uncheckedIcon={
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                height: "100%",
                                                fontSize: 14,
                                                color: "white",
                                                paddingRight: 2
                                            }}
                                        >
                                            Outcome
                                        </div>
                                    }
                                    checkedIcon={
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                height: "100%",
                                                fontSize: 14,
                                                color: "white",
                                                paddingLeft: 10
                                            }}
                                        >
                                            Income
                                        </div>
                                    }
                                    className="react-switch"
                                    id="call-type-switch"
                                />
                            </div>
                        </label>
                    </div>
                    <br/>

                    {
                        this.state.isInputReport ?
                            (
                                <div>
                                    <OperatorsInputPerformanceChart fromDate={this.state.fromDateTimeStamp} toDate={this.state.toDateTimeStamp} />
                                    <OperatorsInputPerformanceTable fromDate={this.state.fromDateTimeStamp} toDate={this.state.toDateTimeStamp} className="mobile-hider" />
                                </div>
                            )
                        :
                            (
                                <div>
                                    <OperatorsOutputPerformanceChart fromDate={this.state.fromDateTimeStamp} toDate={this.state.toDateTimeStamp} />
                                    <OperatorsOutputPerformanceTable fromDate={this.state.fromDateTimeStamp} toDate={this.state.toDateTimeStamp} className="mobile-hider" />
                                </div>
                            )                        
                    }
                                        
                </EiPanel>

                {/* <EiPanel size="12" smsize="12" mdsize="12" lgsize="12" xlsize="12" title="Employee performance details diagram">
                </EiPanel> */}
                
            </div>            
        );
    }
}
export default Dashboard;
