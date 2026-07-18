import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const ProgressChart: React.FC<{completed: number, pending: number, overdue: number}> = ({completed, pending, overdue}) => {
  const data = {
    labels: ['Completed','Pending','Overdue'],
    datasets: [
      {
        data: [completed, pending, overdue],
        backgroundColor: ['#10B981', '#3B82F6', '#EF4444']
      }
    ]
  }
  return <Doughnut data={data} />
}

export default ProgressChart
