import { useSession, getSession } from "next-auth/react"
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Proyectos from '../../components/Proyectos'
import { useEffect } from 'react'
import useProyectos from "../../hooks/proyectos"

const Prueba = ({ data }) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [proyectos, addProyecto] = useProyectos(data)
    useEffect(() => {
        if (!session) {
            console.log(session)
            console.log('deslogeado')
          router.push('/login')
        }
      }, [session])
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
        return (
            <Proyectos proyectos={proyectos} addProyecto={addProyecto}></Proyectos>
        )
    }
    else{
        return (<p>Redirecting...</p>)
    }
}

export default Prueba

export async function getServerSideProps(context) {
    const session = await getSession(context)
  
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
    const url = process.env.NEXT_PUBLIC_API_URL+'/api/proyectos/list';
    console.log(url)
    const res = await fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.accessToken}`,
      },
  })
  const data = await res.json();
    return {
      props: { 
        session,
        data: data 
      }
    }
  }