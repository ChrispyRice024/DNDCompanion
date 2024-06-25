import react from 'react'
import {useState, useEffect} from 'react'

export default function Api ({functions}){
    const {fetchData, setFetchData} = functions
    const [stall, setStall] = useState(0)

    
    //fetch the list of classes on render
    // useEffect(() => {
    //     const classList = async () => {
    //         try{
    //             const res = await fetch(`https://dnd5eapi.co/api/classes`)
    //             const data = await res.json()

    //             setFetchData(prevData => ({
    //                 ...prevData,
    //                 class_list:data
    //             }))
    //             console.log(fetchData)
    //         }catch(err){
    //             console.error(err)
    //         }
    //     }
        
    //     classList()
    //     console.log(fetchData)
    //     // if(stall === 0){
    //     //     setStall(1)
    //     // }
    //     // console.log(stall)
    // }, [])
    
    // //Fetch the Class Data after the class has been selected
    // useEffect(() => {

    //     const fetchClassData = async () => {
    //         try{
    //             const res = await fetch(`https://dnd5eapi.co${primaryClassUrl}`)
    //             const data = await res.json()

    //             setFetchData((prevData) => ({
    //                 ...prevData,
    //                 primary_class: data
    //             }))
    //             console.log({data})
    //         }catch(err){
    //             console.error(err)
    //         }
    //     }
    //     fetchClassData()
    // }, [primaryClassUrl])



}

