import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import * as React from 'react'

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Nombre Proyecto',
      width: 250,
      editable: false,
    }
  ];

const ListProyectos = ({ proyectos, setAgregar }) => {
    return (
        <React.Fragment>
        <DataGrid
            rows={proyectos}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            autoHeight
        />
        <Button variant='outlined' onClick={() => setAgregar(1)} sx={{marginTop: '5px'}}>Nuevo Proyecto</Button>
        </React.Fragment>
    )
}

export default ListProyectos