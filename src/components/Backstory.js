import { useState, useEffect, memo } from 'react'
import fs from 'fs'


export default function Backstory ({functions}) {

    const {char, charChanges, setCharChanges, setChar} = functions

    const [character, setCharacter] = useState(char)
    console.log(character)
    const [charDesc, setCharDesc] = useState({
        backstory:'',
        personality_traits:'',
        ideals:'',
        bonds:'',
        flaws:'',
        gender:'',
        apperance:''
    })

    const [charId, setCharId] = useState()

    const handleChange = (e) => {
        e.preventDefault()

        setCharDesc(prevDesc => ({
            ...prevDesc,
            [e.target.name]:e.target.value
        }))
        
    }
    console.log('char', char)

    const [isChanging, setIsChanging] = useState(false)
    const handleIsChanging = () => {
        if(isChanging){
            setIsChanging(false)
        }else{
            setIsChanging(true)
        }
    }

    useEffect(() => {
        console.log('charId', charId)
        if(charChanges !== char){
            fs.readFile('save.json', 'utf8', (err, data) => {
                if(err){
                    console.error(err)
                }
                const jsonData = JSON.parse(data)

                const thisChar = jsonData.find(x => x.id === char.id)
                console.log(thisChar)
                console.log('if', charId)
                setChar(thisChar)
            })
        }else{
            // return
            console.log(charChanges)
        }
    }, [charChanges])

    // {
    //     "backstory": "was orphaned at a young age. while living on the streets, he got into a fight club and became very good at it. has beern fighting ever since.",
    //         "traits": "",
    //             "ideals": "dont dish out what you cant take in return.",
    //                 "bonds": "has a childhood friend that he hasnt seen in years. maybe theyre still out there somewhere.",
    //                     "flaws": "to quick to start a fight if he thinks someone is being out of line",
    //                         "gender": "Male",
    //                             "apperance": "Short and thin with lean muscles",
    //                                 "height": "5'8",
    //                                     "personality_traits": "tough, but also caring. he activley looks for bad people so he can fight them"
    // }

    const handleSubmit = (e) => {
        e.preventDefault()

        setCharChanges(prevChar => {
            const copy = {...char}
            
            copy.desc = charDesc
            console.log(copy)
            
            fs.readFile('./save.json', (err, data) => {

                const list = JSON.parse(data)
                const indexToChange = list.findIndex(x => x.id === char.id)

                list.splice(indexToChange, 1, copy)

                const listString = JSON.stringify(list)

                fs.writeFile('save.json', listString, (err) => {
                    if(err){
                        console.error(err)
                    }else{
                        console.log('succesfully added backstory', list)
                    }
                })
                
                setIsChanging(false)
                window.location.reload()
            })
            return copy
        })
        setCharId(char.id)
    }

    const form = (
        <form>
            <p>
                <strong>Physical Apperance</strong>
            </p>
            <p>
                <label htmlFor='gender'>Gender</label>
            </p>
            <p>
                <input
                    defaultValue={char?.desc?.gender || ''}
                    type='text'
                    name='gender'
                    onChange={(e) => { e.preventDefault(); setCharDesc(prevDesc => ({ ...prevDesc, [e.target.name]: e.target.value })) }} />
            </p>
            <p>
                <label htmlFor='height'>Height</label>
            </p>
            <p>
                <input
                    defaultValue={char?.desc?.height || ''}
                    type='text'
                    name='height'
                    onChange={(e) => { e.preventDefault(); setCharDesc(prevDesc => ({ ...prevDesc, [e.target.name]: e.target.value })) }} />
            </p>
            <p>
                <label htmlFor='apperance'>Physical Description</label>
            </p>
            <p>
                <textarea
                    defaultValue={char?.desc?.apperance || ''}
                    name='apperance'
                    spellCheck='true'
                    rows='4'
                    cols='25'
                    onChange={(e) => { e.preventDefault(); setCharDesc(prevDesc => ({ ...prevDesc, [e.target.name]: e.target.value })) }} />
            </p>
            <p>
                <strong>Personality</strong>
            </p>
            <p>
                <label htmlFor='ideals'>Ideals</label>
            </p>
            <p>
                <textarea
                    defaultValue={char?.desc?.ideals || ''}
                    name='ideals'
                    rows='4'
                    cols='25'
                    onChange={(e) => { e.preventDefault(); setCharDesc(prevDesc => ({ ...prevDesc, [e.target.name]: e.target.value })) }} />
            </p>
            <p>
                <label htmlFor='backstory'>Backstory</label>
            </p>
            <p>
                <textarea
                    defaultValue={char?.desc?.backstory || ''}
                    name='backstory'
                    rows='4'
                    cols='25'
                    onChange={(e) => { e.preventDefault(); setCharDesc(prevDesc => ({ ...prevDesc, [e.target.name]: e.target.value })) }} />
            </p>
            <p>
                <label htmlFor='personality_traits'>Personality</label>
            </p>
            <p>
                <textarea
                    defaultValue={char?.desc?.personality_traits || ''}
                    name='personality_traits'
                    rows='4'
                    cols='25'
                    onChange={(e) => { e.preventDefault(); setCharDesc(prevDesc => ({ ...prevDesc, [e.target.name]: e.target.value })) }} />
            </p>
            <p>
                <label htmlFor='bonds'>Bonds</label>
            </p>
            <p>
                <textarea
                    defaultValue={char?.desc?.bonds || ''}
                    name='bonds'
                    rows='4'
                    cols='25'
                    onChange={(e) => { e.preventDefault(); setCharDesc(prevDesc => ({ ...prevDesc, [e.target.name]: e.target.value })) }} />
            </p>
            <p>
                <label htmlFor='flaws'>Flaws</label>
            </p>
            <p>
                <textarea
                    defaultValue={char?.desc?.flaws || ''}
                    name='flaws'
                    rows='4'
                    cols='25'
                    onChange={(e) => { e.preventDefault(); setCharDesc(prevDesc => ({ ...prevDesc, [e.target.name]: e.target.value })) }} />
            </p>
            <button onClick={handleSubmit}>
                Submit Changes
            </button>
        </form>
    )

    return(
        <div id='backstory'>
            {isChanging ?
                {...form}
            :!isChanging ?
                <div>
                    {console.log(isChanging)}
                    {char.desc ? 
                    <>

                        {Object.entries(char.desc).map(([key, value], i) => {

                            let capitalKey
                            console.log(key, value)

                            if(key.includes('_')){
                                console.log(key)
                                let keyArray = key.split('_')
                                console.log(keyArray)

                                let capitalWords = keyArray.map(x => x.charAt(0).toUpperCase() + x.slice(1))
                                console.log(capitalWords)
                                capitalKey = capitalWords.join(' ')
                            }else{
                                capitalKey = key.charAt(0).toUpperCase() + key.slice(1)
                            }

                            console.log(capitalKey)
                            return(
                                <div className='char_desc'>
                                    <p>
                                        <strong>{capitalKey}</strong>
                                    </p>
                                    <p>
                                        {value}
                                    </p>
                                </div>
                            )
                        })}
                        <p>
                            <button onClick={handleIsChanging}>Change Backstory</button>       
                        </p>
                    </>
                    :<button onClick={handleIsChanging}>Create Backstory</button>}
                </div>
            :''}
        </div>
    )
}