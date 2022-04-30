import { Field, Form, Formik } from 'formik'
import { Button } from '@mui/material'
import * as React from 'react'
import Title from './Title'
import * as Yup from 'yup'
import Input from './Input'
import { useSession } from 'next-auth/react'

const AgregarProyecto = ({ proyectos, setAgregar, addProyecto }) => {
    const { data: session } = useSession()
    const handleSubmit = async ({name}, {resetForm}) => {
        console.log('llamado')
        const payload = {
            name : name,
          };
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/proyectos/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.user.accessToken}`,
            },
            body: JSON.stringify(payload),
        })
        const data = await res.json();
        if(data.status == true){
            console.log(data)
            addProyecto(data.data)
            resetForm({})
        }
    }
    return (
        <React.Fragment>
            <Title>Agregar Proyecto</Title>
            <Formik
                initialValues={{
                    name: '',
                }}
                onSubmit={ handleSubmit }
                validationSchema={
                    Yup.object({
                        name: Yup.string()
                        .max(30, 'Debe tener como maximo 30 caracteres')
                        .required('Debe ingresar un nombre de proyecto')
                    })
                }
            >
                <Form id='agregar_proyecto'>
                    <Input name="name" label="Nombre Proyecto" />
                    <Button variant='outlined' type='submit' form='agregar_proyecto'>Agregar</Button><Button variant='outlined' sx={{ marginLeft: '5px'}} type='submit' onClick={() => setAgregar(0)}>Volver</Button>
                </Form>    
            </Formik>
        </React.Fragment>
    )
}

export default AgregarProyecto