// ** React Imports

import { useState } from 'react'

const moment = require('moment')

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'

const columns = [
  { id: 'url', label: 'Image' },
  { id: 'product_id', label: 'ID' },
  { id: 'product_name', label: 'Name' },
  {
    id: 'product_sku',
    label: 'Product SKU'
  },
  {
    id: 'product_unit_price',
    label: 'Unit Price'
  },
  {
    id: 'product_quantity',
    label: 'Quantity'
  },
  { id: 'address', label: 'Address' }
]

const TableStickyHeader = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [row, setRow] = useState(null)
  const [orderDetails, setOrderDetails] = useState(null)

  const handleOpen = id => {
    const founproduct_unit_priceject = data?.orders?.find(obj => obj.order_id === id)
    setOrderDetails(founproduct_unit_priceject.order_items)
    setRow(row)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  function createData(product_id, product_name, product_sku, product_quantity, address, product_unit_price) {
    return { product_id, product_name, product_sku, product_quantity, address, product_unit_price }
  }

  const rows = []

  data?.forEach(item => {
    const { product_id, product_name, product_sku, product_quantity, product_unit_price, address } = item
    rows.push(createData(product_id, product_name, product_sku, product_quantity, address, product_unit_price ))
  })

  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <>
                    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  </>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                    {columns.map(column => {
                      const value = row[column.id]
                      if (column.id === 'url') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <img src={`${column.url}`} alt="image" width="80" height="80"></img>
                          </TableCell>
                        )
                      } else {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        )
                      }
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    
    </>
  )
}

export default TableStickyHeader
