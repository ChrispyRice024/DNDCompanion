import react from 'react'
import {useState, useEffect} from 'react'

export default function CharacterList () {

    const [characterData, setCharacterData] =useState([])

    useEffect(() => {
        fs.readFile('save.json', 'utf8', (err, data) => {
            if(err){
                console.error(err)
            }else{
                setCharacterData(data)
            }
        })
    })

    return(
        <div id='char_list'>
            {characterData?.length > 0 ? 
                characterData.map((char, i) => {

                    return(
                        <div>
                            
                        </div>
                    )
                })
            : 'You have no characters'}
        </div>
    )
}