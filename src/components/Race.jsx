import react from 'react'
import {useState, useEffect} from 'react'

export default function Race({functions}) {

    const {fetchData, raceFetch} = functions
    // const racesFetch = fetch('https://www.dnd5eapi.co/api/classes').then((res) =>res.json()).then((res) => console.log(res.results))
    const [raceList, setRaceList] = useState([])
    const [raceData, setraceData] = useState('')
    const [secondaryRaceData, setSecondaryRaceData] = useState('')

    //this should set only the raceList variable
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/races')
        .then((res) => res.json())

        .then((data) => {
            console.log(data)
            setRaceList(data.results)
        })

        
        .catch((err) => {
            console.error('Error fetching data: ', err)
        })
    }, [])

    const verifyInput = (e) => {
        const input = e.target.value
        const url = e?.target?.list?.querySelector(`option[value='${e.target.value}']`)?.getAttribute('data-url')

        const compare = raceList.some(element => element.name === input) || raceList.some(element => element.name.toLowerCase() === input)

        if(compare){
            raceFetch(url)
        }
    }
    

    return(
        <div>
            <p>
            <h2>Race</h2>
            </p>
            <p> 
                <input name='race' list='raceSet' autoComplete='on' onChange={verifyInput} id='raceList' placeholder='Race'/>
                <datalist id='raceSet'>
                    {raceList.map((race, i) => (
                        <option
                        key={i}
                        data-url={race.url}
                        value={race.name}/>
                    ))}
                </datalist>
            </p>
        </div>
    )
}