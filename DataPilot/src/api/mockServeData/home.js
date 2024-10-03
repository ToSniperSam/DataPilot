import Mock from 'mockjs'

let List = []
export default {
  getStatisticalData: () => {
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          Apple: Mock.Random.float(100, 8000, 0, 0),
          Vivo: Mock.Random.float(100, 8000, 0, 0),
          Oppo: Mock.Random.float(100, 8000, 0, 0),
          Meizu: Mock.Random.float(100, 8000, 0, 0),
          Samsung: Mock.Random.float(100, 8000, 0, 0),
          Xiaomi: Mock.Random.float(100, 8000, 0, 0)
        })
      )
    }
    return {
      code: 20000,
      data: {

        videoData: [
          {
            name: 'Xiaomi',
            value: 2999
          },
          {
            name: 'Apple',
            value: 5999
          },
          {
            name: 'Vivo',
            value: 1500
          },
          {
            name: 'Oppo',
            value: 1999
          },
          {
            name: 'Meizu',
            value: 2200
          },
          {
            name: 'Samsung',
            value: 4500
          }
        ],

        userData: [
          {
            date: 'Mon',
            new: 5,
            active: 200
          },
          {
            date: 'Tues',
            new: 10,
            active: 500
          },
          {
            date: 'Wed',
            new: 12,
            active: 550
          },
          {
            date: 'Thu',
            new: 60,
            active: 800
          },
          {
            date: 'Fri',
            new: 65,
            active: 550
          },
          {
            date: 'Sat',
            new: 53,
            active: 770
          },
          {
            date: 'Sun',
            new: 33,
            active: 170
          }
        ],
        orderData: {
          date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
          data: List
        },
        tableData: [
          {
            name: 'Oppo',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000
          },
          {
            name: 'Vivo',
            todayBuy: 300,
            monthBuy: 2200,
            totalBuy: 24000
          },
          {
            name: 'Apple',
            todayBuy: 800,
            monthBuy: 4500,
            totalBuy: 65000
          },
          {
            name: 'Xiaomi',
            todayBuy: 1200,
            monthBuy: 6500,
            totalBuy: 45000
          },
          {
            name: 'Samsung',
            todayBuy: 300,
            monthBuy: 2000,
            totalBuy: 34000
          },
          {
            name: 'Meizu',
            todayBuy: 350,
            monthBuy: 3000,
            totalBuy: 22000
          }
        ]
      }
    }
  }
}
