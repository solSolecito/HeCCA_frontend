import React from "react";
import PropTypes from 'prop-types';
import { Line } from "react-chartjs-2";

function LineChart(props) {
    const title = props.title ? {
        display: true,
        text: props.title
    } : { 
        display: false
    }

    const legend = props.legend ? {
        display: true,
        text: props.legend
    } : { 
        display: false
    }

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={ props.chartData }
        options={{
          plugins: {
            title,
            legend
          }
        }}
      />
    </div>
  );
}

LineChart.propTypes = {
}
 
export default LineChart;