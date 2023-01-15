import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJs , CategoryScale, LinearScale, PointElement ,LineElement , Title , Tooltip , Legend } from 'chart.js';
import { background, border } from '@chakra-ui/react';

ChartJs.register(
    CategoryScale, LinearScale, PointElement ,LineElement , Title , Tooltip , Legend 
)

const Chart = ({arr=[] , currency , days}) => {

    const prices=[];
    const dates =[];

    // console.log(arr.length);

    for (let i = 0; i < arr.length; i+=1) {
        
        if(days === "24h" || days==='1h'){
            dates.push(new Date(arr[i][0]).toLocaleTimeString());        
        }
        else dates.push(new Date(arr[i][0]).toLocaleDateString());        
        
        prices.push(arr[i][1]);
    }

    // console.log(dates);

    const data ={
        labels: dates,
        datasets: [{

            label : `price in ${currency}`,
            data : prices,
            borderColor:'#0022ff5e',
            backgroundColor:'#0022ff5e', 
        }]
    };

  return (
    <Line options={{
        responsive :  true,
    }}
    data={data} />
  ) 
}

export default Chart