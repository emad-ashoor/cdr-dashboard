import React from 'react';
import { CircleLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const EiLoading = (props) => {
    return (
        <div className="ei-loading" style={{ display: !props.isLoading ? 'none' : '' }}>
            <CircleLoader
                css={override}
                size={150}
                //size={"150px"} this also works
                color={"#BE00FF"}
                loading={true}
            />
            <div>Loading ...</div>
        </div>
    )
}

export default EiLoading;