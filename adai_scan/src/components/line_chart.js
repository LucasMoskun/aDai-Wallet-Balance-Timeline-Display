import React from 'react';

import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const LineChart = (props) => {

    var options = {
        animationEnabled: true,
        exportEnabled: true,
        zoomEnabled: true,
        theme: "light1",
        title:{
            text: "aDai Wallet Balance Over Time"
        },
        axisY: {
            title: "Balance",
            suffix: " aDai"
        },
        axisX: {
            title: "time",
            prefix: "",
            interval: 100000
        },
        data: [{
            type: "line",
            xValueType: "dateTime",
            toolTipContent: "aDai balance {x}: {y} aDai",
            dataPoints: props.data
        }]
    }

    return (
        <div>
        <CanvasJSChart options = {options} />
        </div>
    );
}