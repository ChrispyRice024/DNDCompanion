import react from 'react'
import {useState, useEffect} from 'react'

export default function Race({functions}) {

    const {setCharacter, character, proBonus} = functions
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

    useEffect(() => {
        if(primaryRaceData !== ''){
        fetch(`https://www.dnd5eapi.co/api/races/${primaryRaceData}`)
            .then(res => res.json())
            .then(data => {
                console.log('Race.js', {data})
                setCharacter(prevCharacter => ({
                    ...prevCharacter,
                    race:{
                        ...prevCharacter.race,
                        primary: data
                    }
                }))
            }).catch(err => {
                console.error('Error ', err)
            })
        }

    }, [primaryRaceData])

    useEffect(() => {
        if(secondaryRaceData !== ''){
        fetch(`https://www.dnd5eapi.co/api/races/${secondaryRaceData}`)
        .then(res => res.json())
        .then(data => {
            setCharacter(prevCharacter => ({
                ...prevCharacter,
                race:{
                    ...prevCharacter.race,
                    secondary: data
                }
            }))
        }).catch(err => {
            console.error('Error ', err)
        })
    }
    }, [secondaryRaceData])


    const verifyInput = (e) => {
        const input = e.target.value
        const inputName = e.target.name
        const compare = raceList.some(element => element.name === input) || raceList.some(element => element.name.toLowerCase() === input)

        if(inputName === 'primaryRace' && compare){
            setPrimaryRaceData(input.toLowerCase())
            
        }else if(inputName === 'secondaryRace' && compare){
            setSecondaryRaceData(input.toLowerCase())
        
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
                        value={race.name}/>
                    ))}
                </datalist>
            </p>
        </div>
    )
}