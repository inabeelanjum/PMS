
import React, {useState , useEffect} from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Button } from '@mui/material';
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
import Loader from 'src/utils/loader'


const Dashboard = () => {
  const router = useRouter()
  const [loader, setLoader] = useState(false)

  const [orders , setOrders] = useState('')
  useEffect(() => {
    setLoader(true)
    UserService.getCustomers()
    .then((res) => {
      if(res.data.responseCode === 2000){
        setOrders(res.data.data)
        setLoader(false)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  const handleClick = (e) => {
    e.preventDefault()
    router.push('/customers/addCustomer')
  }
  if (loader) {
    return <Loader />
  }
  
  return (

    <ApexChartWrapper>
      <Grid container spacing={6} sx={{justifyContent:"right"}}>
     
      <Button onClick={handleClick} variant="contained" sx={{marginTop:"20px"}}>Add Customer</Button>
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
