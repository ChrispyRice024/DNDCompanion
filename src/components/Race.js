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
            console.log(data)
            // console.log(raceList)
        })
        .catch((err) => {
            console.error('Error fetching data: ', err)
        })
        //this loggs an empty object, which is correct
        console.log(character.misc.primaryRace)
    }, [])

    useEffect(() => {
        if(primaryRaceData !== ''){
        fetch(`https://www.dnd5eapi.co/api/races/${primaryRaceData}`)
            .then(res => res.json())
            .then(data => {
                setCharacter(prevCharacter => ({
                    ...prevCharacter,
                    misc:{
                        ...prevCharacter.misc,
                        primaryRace: data
                    }
                }))
                console.log(data)
            }).catch(err => {
                console.error('Error ', err)
            })
        }

    }, [primaryRaceData])

    useEffect(() => {
        if(primaryRaceData !== ''){
        fetch(`https://www.dnd5eapi.co/api/races/${secondaryRaceData}`)
        .then(res => res.json())
        .then(data => {
            setCharacter(prevCharacter => ({
                ...prevCharacter,
                misc:{
                    ...prevCharacter.misc,
                    secondaryRace: data
                }
            }))
        }).catch(err => {
            console.error('Error ', err)
        })
    }
    }, [secondaryRaceData])



    // const verifyInput = (e) => {
    //     let input = e.target.value
    //     const compare = raceList.some(element => element.name === input) || raceList.some(element => element.name.toLowerCase() === input)
    //     console.log(raceList)
    //     if(compare){
    //         setCharacter(prevCharacter => ({
    //             ...prevCharacter,
    //             misc:{
    //                 ...prevCharacter.misc,
    //                 [e.target.name]: input.charAt(0).toUpperCase() + input.slice(1)
    //             }
    //         }
    //         ))
    //     setChosenRace(input.toLowerCase())
    //     console.log(chosenRace)
    //     }else{
    //         input = ''
    //     }
    //     console.log(compare)
    //     console.log(character.misc)
    // }

    const verifyInput = (e) => {
        let input = e.target.value
        const inputName = e.target.name
        const compare = raceList.some(element => element.name === input) || raceList.some(element => element.name.toLowerCase() === input)

        if(inputName === 'primaryRace' && compare){
            setPrimaryRaceData(input.toLowerCase())
        
        }else if(inputName === 'secondaryRace' && compare){
            setSecondaryRaceData(input.toLowerCase())
        
        }else{
            input = ''
        }

        console.log(primaryRaceData)
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
                <input name='primaryRace' list='primaryRaceList' autoComplete='on' onChange={verifyInput} id='primaryRace' className='classRace' placeholder='Race'/>
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
                <input name='secondaryRace' list='secondaryRaceList' onChange={verifyInput} id='secondaryRace' className='race' placeholder='Race'/>
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