import react from 'react'
import {useState, useEffect} from 'react'

export default function Race({functions}) {

    const {setCharacter, character, proBonus} = functions
    // const racesFetch = fetch('https://www.dnd5eapi.co/api/classes').then((res) =>res.json()).then((res) => console.log(res.results))
    //Holds the names of the races for the datalist
    const [raceList, setRaceList] = useState([])
    //holds the name of the chosen races for the fetch request
    const [primaryRace, setPrimaryRace] = useState('')
    const [secondaryRace, setSecondaryRace] = useState('')
    //holds the actual data from the race
    const [primaryRaceData, setPrimaryRaceData] = useState({})
    const [secondaryRaceData, setSecondaryRaceData] = useState({})

    //Sets the raceList which populates the dropdown boxs
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

    //Sets the character race value
    useEffect(() => {
        if(primaryRace !== ''){
        fetch(`https://www.dnd5eapi.co/api/races/${primaryRace}`)
            .then(res => res.json())
            .then(data => {
                setPrimaryRaceData(data)
                // setCharacter(prevCharacter => ({
                //     ...prevCharacter,
                //     misc:{
                //         ...prevCharacter.misc,
                //         primaryRace: data
                //     }
                // }))
                console.log(data)
            }).catch(err => {
                console.error('Error ', err)
            })
        }
    }, [primaryRace])

    useEffect(() => {
        if(secondaryRace !== ''){
        fetch(`https://www.dnd5eapi.co/api/races/${secondaryRace}`)
        .then(res => res.json())
        .then(data => {
            setSecondaryRaceData(data)
            // setCharacter(prevCharacter => ({
            //     ...prevCharacter,
            //     misc:{
            //         ...prevCharacter.misc,
            //         secondaryRace: data
            //     }
            // }))
        }).catch(err => {
            console.error('Error ', err)
        })
    }
    }, [secondaryRace])

useEffect(() => {
    console.log('primaryRace', primaryRace)
    console.log('secondaryRace', secondaryRace)
    console.log('primaryRaceData', primaryRaceData)
    console.log('secondaryRaceValue', secondaryRaceData)
}, [primaryRace, secondaryRace, primaryRaceData, secondaryRaceData])

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
            setPrimaryRace(input.toLowerCase())
        
        }else if(inputName === 'secondaryRace' && compare){
            setSecondaryRace(input.toLowerCase())
        
        }else{
            input = ''
        }

        // decidceBonus(e)
        console.log(character)
        console.log(secondaryRace)
    }
    
    const handleSendRaceData = (data) => {
        sendRaceData(data)
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