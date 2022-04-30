import Container from '../components/Container'
import Card from '../components/Card'
import Title from '../components/Title'
import Button from '../components/Button'
import { useSession } from "next-auth/react"
import { signOut } from 'next-auth/react'
import Link from 'next/link'

const Prueba = () => {
    const { data: session } = useSession()
    const logout = async () => {
        console.log(session.user.accessToken)
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.user.accessToken}`,
            },
        })
        const data = await res.json();
        if(res.ok && data.status == true){
            signOut({ callbackUrl: '/login' })
        }
    }
    if(session){
        console.log("Logeado")
        return (
            <Container>
                <Card>
                    <Title>Prueba</Title>
                    <Title>{ session.user.user.email }</Title>
                    <Button onClick={logout}>LogOut</Button>
                </Card>
                
            </Container>
        )
    }
    else{
        return(
            <Container>
                <Card>
                    <Title>Logea horro ql</Title>
                    <Link href='/login'><Button>Login</Button></Link>
                </Card>
                
            </Container>
        )
        
    }
}

export default Prueba