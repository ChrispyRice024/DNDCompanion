import react from 'react'
import {useState, useEffect} from 'react'

import RaceInfo from '../components/RaceInfo'

export default function Race({functions}) {

    const {fetchData, raceFetch, setFetchData} = functions
    // const racesFetch = fetch('https://www.dnd5eapi.co/api/classes').then((res) =>res.json()).then((res) => console.log(res.results))
    const raceList = fetchData?.race_list

    const isHidden = fetchData?.race?.name ? '' : 'none'
    
    const [raceDiv, setRaceDiv] = useState()

    //this should set only the raceList variable


    useEffect(() => {
        setRaceDiv(
            <>
                <div id='raceInfo'>
                    <RaceInfo functions={{fetchData:fetchData,
                                        setFetchData:setFetchData}} />
                </div>
            </>
        )
    },[fetchData?.race])
    const verifyInput = (e) => {
        const input = e.target.value
        // const url = e?.target?.list?.querySelector(`option[value='${e.target.value}']`)?.getAttribute('data-url')
        const selected = e.target.options[e.target.selectedIndex]
        const url = selected.getAttribute('data-url')
        console.log('url', url)
        
        const compare = raceList.some(element => element.name === input) || raceList.some(element => element.name.toLowerCase() === input)

        // if(compare){
            raceFetch(url)
        // }
    }
    useEffect(() => {
        console.log(fetchData)
        console.log('isHidden', isHidden)
    }, [fetchData])

    return(
        <div>
            <div>
                <p>
                    <h2>Race</h2>
                </p>
                <p> 
                    <select onChange={verifyInput} id='raceSet' defaultValue=''>
                        <option value='' disabled >Select a Race</option>
                        {raceList.map((race, i) => (
                            <option
                            key={i}
                            data-url={race.url}
                            value={race.name}>
                                {race.name}
                            </option>
                        ))}
                    </select>
                </p>
                {console.log(fetchData?.race)}
            </div>
            
            <div>
            {raceDiv}      
                  
            </div>
        </div>
    )
}