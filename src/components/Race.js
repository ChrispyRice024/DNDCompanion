import react from 'react'
import {useState, useEffect} from 'react'

import RaceInfo from './RaceInfo'

    export default function Race({functions}) {

        const {raceFetch, setFetchData, fetchData} = functions

        const [div, setDiv] = useState()

        const isHidden = fetchData?.race?.name ? '' : 'none'

        useEffect(() => {
            const fetchCall = async () => {
                try{
                    const res = await fetch('https://www.dnd5eapi.co/api/races')
                    const data = await res.json()
              
                    setFetchData(prevData => ({
                        ...prevData,
                        race_list:data.results
                    }))
      
                }catch(err){
                    console.error('Error fetching data: ', err)
                }
            }
            fetchCall()
        }, [])

        const verifyInput = (e) => {
            const input = e.target.value

            const selected = e.target.options[e.target.selectedIndex]
            const url = selected.getAttribute('data-url')

            const compare = fetchData?.race_list?.some(element => element.name === input) || fetchData?.race_list?.some(element => element.name.toLowerCase() === input)

                raceFetch(url)

        }

        return(
            <div>
                <div>
                        <h2>Race</h2>
                </div>
                {fetchData?.race_list ?
                    <p> 
                        <select onChange={verifyInput} id='raceSet' defaultValue=''>
                        <option value='' disabled >Select a Race</option>
                        {fetchData?.race_list?.map((race, i) => (
                        <option
                        key={i}
                        data-url={race.url}
                        value={race.name}>
                            {race.name}
                        </option>
                        ))}
                        </select>
                    </p>
                :'Loading...'}
            
                <div style={{display:isHidden}}>
                        <div id='raceInfo'>
                            <RaceInfo functions={{fetchData:fetchData,
                                                setFetchData:setFetchData}} />
                        </div>
                </div>
            </div>
        )
    }