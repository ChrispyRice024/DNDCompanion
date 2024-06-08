import react from 'react'
import {useState, useEffect} from 'react'

export default function Api ({functions}){
    const {fetchData, setFetchData, primaryClassUrl, classUrl} = functions
    const [stall, setStall] = useState(0)

    

    useEffect(() => {
        const classList = async () => {
            try{
                const res = await fetch(`https://dnd5eapi.co/api/classes`)
                const data = await res.json()

                setFetchData(() => ({
                    class_list:data
                }))
            }catch(err){
                console.error(err)
            }
        }

        classList()
        if(stall === 0){
            setStall(1)
        }
        console.log(stall)
    }, [])

    useEffect(() => {
        console.log(classUrl)
        const fetchClassData = async () => {
            try{
                const res = await fetch(`https://dnd5eapi.co${classUrl}`)
                const data = await res.json()

                console.log({data})
            }catch(err){
                console.error(err)
            }
        }
        fetchClassData()
    }, [primaryClassUrl])
}

