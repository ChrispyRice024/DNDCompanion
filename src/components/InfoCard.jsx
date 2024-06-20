import {useState, useEffect} from 'react'
import { Children } from 'react';


export default function InfoCard({functions}) {
    
    const {
        fetchData,
        url,
        parentName,
        spawnCount,
        setSpawnCount,
        className,
        hoveredKey,
    } = functions
    const api = `https://www.dnd5eapi.co`
console.log(api + url)
    const [info, setInfo] = useState({})
    useEffect(() => {
        const fetch = async () => {
            try{
                const res = await fetch(api + url)
                const data = await res.json()
                
                // setInfo(data)
                console.log(data)
            }catch(err){
                console.error(err)
            }
        }

        // fetch()
    },[fetchData])
    
    return(
        <div>

        </div>
    )
}