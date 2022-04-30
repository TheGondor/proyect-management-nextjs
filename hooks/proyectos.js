import { useState } from "react"

const useProyectos = (inicial) => {
    const [proyectos, setProyectos] = useState(inicial)

    const addProyecto = (proyecto) => {
        setProyectos([
            ...proyectos,
            proyecto
        ])
    }

    return [proyectos, addProyecto]
}

export default useProyectos