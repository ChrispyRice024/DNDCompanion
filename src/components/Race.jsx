import react from 'react'
import {useState, useEffect} from 'react'

export default function Race({functions}) {

    const {fetchData, raceFetch} = functions
    // const racesFetch = fetch('https://www.dnd5eapi.co/api/classes').then((res) =>res.json()).then((res) => console.log(res.results))
    const [raceList, setRaceList] = useState([])
    const [primaryRaceData, setPrimaryRaceData] = useState('')
    const [secondaryRaceData, setSecondaryRaceData] = useState('')

    //this should set only the raceList variable
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/races')
        .then((res) => res.json())

        .then((data) => {
            setRaceList(data.results)
        })
        .catch((err) => {
            console.error('Error fetching data: ', err)
        })
    }, [])

    const verifyInput = (e) => {
        const input = e.target.value
        const inputName = e.target.name
        const url = e?.target?.list?.querySelector(`option[value='${e.target.value}']`)?.getAttribute('data-url')
        // console.log(e.tareget.list)

        const compare = raceList.some(element => element.name === input) || raceList.some(element => element.name.toLowerCase() === input)

        if(inputName === 'primaryRace' && compare){
            raceFetch(url, 'primary_race')
            
        }else if(inputName === 'secondaryRace' && compare){
            console.log('url verifyInput', url)
            raceFetch(url, 'secondary_race')
        }
    }
    

    return(
        <div>
            <p>
                {/* needs to be added to the character model */}
                <label htmlFor='charName'>Character Name</label>
                <input name='charName' id='charName' className='race'placeholder='Character Name' />
            </p>

            <p>
                {/* needs to be added to the character model */}
                <label htmlFor='primaryRace'>Primary Race</label>
                <input name='primaryRace' list='primaryRaceList' autoComplete='on' onChange={verifyInput} id='primaryRace' className='race' placeholder='Race'/>
                <datalist id='primaryRaceList'>
                    {raceList.map((race, i) => (
                        <option
                        key={i}
                        data-url={race.url}
                        value={race.name}/>
                    ))}
                </datalist>
            </p>
            <p>
                <label htmlFor='secondaryRace'>Secondary Race</label>
                <input name='secondaryRace' list='secondaryRaceList' autoComplete='on' onInput={verifyInput} id='secondaryRace' className='race' placeholder='Race'/>
                <datalist id='secondaryRaceList'>
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