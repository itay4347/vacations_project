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

const LikeChart: FC<LikeChartProps> = () => {

  const {vacations} = useAppSelector(State => State.vacationsState);

  chartJs.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
  )
  const labels = vacations.map((vacation) => vacation.destination);
  const labelsData = vacations.map((vacation) => vacation.followersCount);
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
          <Bar
            style={
              {
                padding:"30px",
                width:"100%",
                height:"80%",
                position:"absolute",
                top:"60%",
                left:"50%",
                transform:"translate(-50%,-50%)"
              }
            }
            data={likeChartData} 
            options={{}} />
        </div>
    </div>
  )
}

export default LikeChart;
