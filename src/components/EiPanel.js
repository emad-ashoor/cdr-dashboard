import React from 'react';
// import EiLoading from './EiLoading';

class EiPanel extends React.Component {
    render () {
        return (
            <div className={`
                ei-col-${ this.props.size ? this.props.size : 12 } 
                ${ this.props.smsize ? "ei-sm-"+this.props.smsize : '' }
                ${ this.props.mdsize ? "ei-md-"+this.props.mdsize : '' }
                ${ this.props.lgsize ? "ei-lg-"+this.props.lgsize : '' }
                ${ this.props.xlsize ? "ei-xl-"+this.props.xlsize : '' }
            `}>
                <div className={`ei-panel ${this.props.className ? this.props.className : ''} `}>
                    {/* <EiLoading isLoading={this.props.isLoading} /> */}

                    { this.props.title ? <span>{this.props.title}</span> : '' }
                    <div className="ei-panel-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default EiPanel;