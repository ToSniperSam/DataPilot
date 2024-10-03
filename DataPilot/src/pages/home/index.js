import React, { useEffect, useState } from "react";
import { Col, Row, Card, Table } from 'antd';
import * as Icon from '@ant-design/icons';
import './home.css'
import { getData } from '../../api'
import MyEcharts from '../../components/Echarts'

const columns = [
  {
    title: 'Course', 
    dataIndex: 'name'
  },
  {
    title: 'Today\'s Purchases', 
    dataIndex: 'todayBuy'
  },
  {
    title: 'Monthly Purchases', 
    dataIndex: 'monthBuy'
  },
  {
    title: 'Total Purchases', 
    dataIndex: 'totalBuy'
  }
]

const countData = [
  {
    "name": "Today's Payment", 
    "value": 124,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "Favorite Orders", 
    "value": 341,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "Unpaid Orders", 
    "value": 127,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  },
  {
    "name": "Monthly Payment", 
    "value": 1884,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "Monthly Fancy", 
    "value": 91,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "Monthly Debt", 
    "value": 1144,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  }
]

const iconToElement = (name) => React.createElement(Icon[name]);
const Home = () => {
  const userImg = require("../../assets/images/Sam.jpg")
  const [echartsData, setEchartsData] = useState([])
  useEffect(() => {
    getData().then(({ data }) => {
      console.log(data, 'res')
      const { tableData, orderData, userData, videoData} = data.data
      setTableData(tableData)
      const order = orderData
      const xData = order.date
      console.log(xData); 
      const keyArray = Object.keys(order.data[0])
      const series = []  
      keyArray.forEach(key => {
        series.push({
          name: key,
          data: order.data.map(item => item[key]),
          type: 'line'
        })
      })
      setEchartsData({
        order: {
          xData: xData, 
          series: series, 
        },
        user:{
          xData:userData.map(item => item.date),
          series:[
            {
              name:'new',
              data:userData.map(item => item.new),
              type:'bar'
            },
            {
              name:'active',
              data:userData.map(item=>item.active),
              type:'bar'
            }
          ]
        },
        video:{
          series:[
            {
              data:videoData,
              type:'pie'
            }
          ]
        }
      })
    })
  }, [])
  
  const [tableData, setTableData] = useState([])



  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable>
          <div className="user">
            <img src={userImg} />
            <div className="userInfo">
              <p className="name"> Sam </p>
              <p className="access">Web Devloper</p>
            </div>
          </div>
          <div className="login-info">
            <p>Last Login:<span>2024.10.1</span></p>
            <p>Base:<span>Hong Kong</span></p>
          </div>
        </Card>

        <Card>
          <Table rowKey={"name"} columns={columns} dataSource={tableData} pagination={false} />
        </Card>

      </Col>

      <Col span={16}>
      <div className="num">
          {
            countData.map((item, index) => {
              return (
<Card key={index}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div className="icon-box" style={{ background: item.color }}>
      {iconToElement(item.icon)}
    </div>
    <div className="detail" style={{ marginLeft: '10px' }}>
      <p className="num">￥{item.value}</p>
      <p className="txt">{item.name}</p>
    </div>
  </div>
</Card>
              )
            })
          }
        </div>

        {echartsData.order && <MyEcharts chartData={echartsData.order} style={{ height: '280px' }} />}
        <div className="graph">
        {echartsData.user && <MyEcharts chartData={echartsData.user} style={{ height: '240px', width:"50%" }} />}
        {echartsData.video && <MyEcharts chartData={echartsData.video} isAxisChart={false} style={{ height: '260px', width:"50%" }} />}
        </div>

      </Col>

    </Row>
  );
}

export default Home;


