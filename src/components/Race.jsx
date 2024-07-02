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
                {/* needs to be added to the character model */}
                <label htmlFor='charName'>Character Name</label>
                <input name='charName' id='charName' className='race'placeholder='Character Name' />
            </p>

            <p>
                {/* needs to be added to the character model */}
                <label htmlFor='race'>Race</label>
                <input name='race' list='raceList' autoComplete='on' onChange={verifyInput} id='race' className='race' placeholder='Race'/>
                <datalist id='raceList'>
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