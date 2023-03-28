
import React, {useState , useEffect} from 'react'

// ** MUI Imports

import Grid from '@mui/material/Grid'
import requireAuth from '../../utils/requireAuth';

// ** Custom Components Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'


// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'


import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import UserService from 'src/services/UserService'
import TableStickyHeader from 'src/views/tables/CustomerTable'


const Dashboard = () => {
  const [orders , setOrders] = useState('')
  useEffect(() => {
    UserService.getCustomers()
    .then((res) => {
      if(res.data.responseCode === 2000){
        setOrders(res.data.data)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  },[])
console.log(orders)

  return (

    <ApexChartWrapper>
      <Grid container spacing={6}>
     
 
        <Grid item xs={12}>
        {orders.length ?  <Card>
          <CardHeader title='Customers' titleTypographyProps={{ variant: 'h6' }} />
                   <TableStickyHeader  data={orders} />
        </Card> : null }
        
      </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default requireAuth(Dashboard);
