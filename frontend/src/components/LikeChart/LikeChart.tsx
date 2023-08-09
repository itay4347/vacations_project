import React, { FC } from 'react';
import styles from './LikeChart.module.scss';
import {
  Chart as chartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { useAppSelector } from '../../hooks';
import { Bar } from 'react-chartjs-2';

interface LikeChartProps {}

//this component uses the react-chart-js-2 library for displaying the likeChart.
const LikeChart: FC<LikeChartProps> = () => {

  chartJs.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
  )
  const {vacations} = useAppSelector(State => State.vacationsState);//getting the vacations array from my redux vacations state.
  const labels = vacations.map((vacation) => vacation.destination);//setting the labels to be an array of my vacation destinations.
  const labelsData = vacations.map((vacation) => vacation.followersCount);//setting the labels data to be an array of my vacations followers count.
  //setting up the chart data according to the library documentation.
  const likeChartData = {
    labels:labels,
    datasets:[
      {
        label: 'Followers Count',
        data: labelsData,
        backgroundColor: 'rgb(130, 115, 96)',
        borderColor: 'rgb(150, 138, 122)',
        borderWidth: 2
      }
    ]
  }

  return(
    <div className={`headerFont ${styles.LikeChart}`}>
        <h2>Vacations Report</h2>
        <div className='barContainer'>
          {/* {using the Bar component to display the chart i chose to display.} */}
          <Bar
            style={
              {
                padding:"30px"
              }
            }
            data={likeChartData} 
            options={{}} />
        </div>
    </div>
  )
}

export default LikeChart;
