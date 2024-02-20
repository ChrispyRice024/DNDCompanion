import react from 'react'
import {useState, useEffect} from 'react'

export default function Race({functions}) {

    const {setCharacter, character, proBonus} = functions
    // const racesFetch = fetch('https://www.dnd5eapi.co/api/classes').then((res) =>res.json()).then((res) => console.log(res.results))
    const [raceList, setRaceList] = useState([])

    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/classes')
        .then((res) => res.json())
        .then((data) => {
            setRaceList(data.results)
            console.log(data)
            console.log(raceList)
        })
        .catch((err) => {
            console.error('Error fetching data: ', err)
        })
    }, [])

    const verifyInput = (e) => {
        let input = e.target.value
        // const compare = raceList.some(element => element === input)

        // if(compare){
            setCharacter(prevCharacter => ({
                ...prevCharacter,
                misc:{
                    ...prevCharacter.misc,
                    [e.target.name]: input
                }

            }
            ))
        // }else{
        //     input = ''
        // }
        console.log(character.misc)
    }

    return(
        <div>
            <p>
                {/* needs to be added to the character model */}
                <label htmlFor='charName'>Character Name</label>
                <input name='charName' id='charName' className='classRace'placeholder='Character Name' />
            </p>

            <p>
                {/* needs to be added to the character model */}
                <label htmlFor='primaryClass'>Primary Class</label>
                <input name='primaryClass' list='primaryRaceList' onChange={verifyInput} id='primaryClass' className='classRace' placeholder='Class'/>
                <datalist id='primaryRaceList'>
                    {raceList.map((race, i) => (
                        <option
                        key={i}
                        value={race.name}/>
                    ))}
                </datalist>
            </p>
            <p>
                <label htmlFor='secondaryClass'>Secondary Class</label>
                <input name='secondaryClass' list='secondaryClassList' onChange={verifyInput} id='secondaryClass' className='classRace' placeholder='Class'/>
                <datalist id='secondaryClassList'>
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