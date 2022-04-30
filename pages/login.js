import Container from '../components/Container'
import Card from '../components/Card'
import Title from '../components/Title'
import Input from '../components/Input'
import Button from '../components/Button'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { signIn, getCsrfToken } from 'next-auth/react'
import { useState } from 'react'

const Login = ({ csrfToken}) => {
    const router = useRouter();
    const [error, setError] = useState(null);

    const handleSubmit = async ({email, password}) => {
        const res = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
            callbackUrl: '/prueba',
          });
        if(res.url){
            router.push(res.url)
        }
    }

    return (
        <Container>
            <Card>
                <Title>Login</Title>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={ handleSubmit }
                    validationSchema={Yup.object({email: Yup.string()
                        .max(30, 'Must be 30 characters or less')
                        .email('Invalid email address')
                        .required('Please enter your email'),
                      password: Yup.string().required('Please enter your password')})}
                >
                    <Form>
                        <Field name='csrfToken' type='hidden' defaultValue={csrfToken}></Field>
                        <Input name="email" label="Email" />
                        <Input name="password" label="Password" type="password" />
                        <Button type='submit'>Ingresar</Button>
                    </Form>    
                </Formik>
            </Card>
        </Container>
    )
}

export default Login
export async function getServerSideProps(context) {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    };
  }