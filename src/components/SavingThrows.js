import React from 'react'
import {useState, useEffect} from 'react'


export default function SavingThrows ({functions}) {
    const {sendSavingThrow, mods} = functions

    const decideST = (e) => {
        e.preventDefault()

        const STMod = `${e.target.dataset.skill}Mod`
        // console.log('STMod', STMod)

        setSavingThrow(mods.STMod.value)
    }

    const [savingThrow, setSavingThrow] = useState({
        str:'0',
        dex:'0',
        con:'0',
        int:'0',
        wis:'0',
        cha:'0'
    })
    useEffect(() => {
        sendSavingThrow(savingThrow)
    })
    return(
        <div>
            {/* {console.log('saving throws mods', mods)}
            {console.log('savingThrow', savingThrow)} */}
            <label htmlFor='stStr'>Strength</label>
            <input name='stStr'type='number' data-stat='str' readOnly onLoad={decideST} defaultValue={savingThrow.str}/>
        </div>
    )
}