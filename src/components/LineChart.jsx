import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography} from 'antd';
import { Chart, registerables } from 'chart.js';
import { useGetCryptoDetailsQuery } from '../services/cryptoApi';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import millify from 'millify';

Chart.register(...registerables);

const LineChart = ({ coinHistory, coinName}) => {

  const { coinId } = useParams()
  const { data: priceData, isFetching } = useGetCryptoDetailsQuery(coinId)
  
  if(isFetching) return <Loader/>;

    
    const coinPrice = [];
    const coinTimestamp = [];
  
    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
      coinPrice.push(coinHistory?.data?.history[i].price);
    }
  
    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
      coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
          {
            label: 'Price in USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };
    
      const options = {
        scales: {
          yAxes: 
            {
              ticks: {
                beginAtZero: true,
              },
            }, 
        },
      };

    return ( 
        <>
            <Row className="chart-header">
                <Typography.Title level={2} className='chart-title'>{coinName} Price Chart</Typography.Title>
                <Col className='price-container'>
                    <Typography.Title level={5} className='price-change'>{coinHistory?.data?.change}%</Typography.Title>
                    <Typography.Title level={5} className='current-price'>Current {coinName} Price : $ {millify(priceData.data.coin.price)}  </Typography.Title>
                </Col>
            </Row>
            <Line data={data} options={options}></Line>
        </>
     );
}
 
export default LineChart;