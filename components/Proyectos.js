import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Container } from '@mui/material'
import { useState } from 'react'
import ListProyectos from './ListProyectos'
import AgregarProyecto from './AgregarProyecto'



const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const Proyectos = ({ proyectos, addProyecto }) => {
  const [agregar, setAgregar] = useState(0)
  console.log(agregar)
  return (
    <React.Fragment>
    <CssBaseline />
    <Container fixed sx={{minHeight: '100vh', display: 'flex', justifyContent: 'center'}}>
    <Grid container spacing={2} >
        <Grid item xs={8} sx={{height: 'auto'}} m='auto'>
        {agregar == 0 ? <ListProyectos proyectos={proyectos} setAgregar={setAgregar} />: <AgregarProyecto proyectos={proyectos}  setAgregar={setAgregar} addProyecto={addProyecto} />}
        </Grid>
    </Grid>
    </Container>
  </React.Fragment>
  );
   
}

export default Proyectos