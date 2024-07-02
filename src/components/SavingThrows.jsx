import React from 'react'
import {useState, useEffect} from 'react'


export default function SavingThrows ({functions}) {
    const {fetchData, character} = functions

    const proBonus = fetchData?.primary_class?.level_data[0]?.prof_bonus

    console.log(fetchData?.primary_class?.level_data[0]?.prof_bonus)

    const decideST = (stat) => {
        let isProficient
        const statValue = character?.stats[stat]?.value
        
        fetchData?.primary_class?.saving_throws?.forEach((obj) => {
            if(obj.name === stat){
                isProficient = true
            }
        })

        if(isProficient){
            return(proBonus + statValue)
        }else{
            return(statValue)
        }
    }

    const [savingThrow, setSavingThrow] = useState({
        str:'0',
        dex:'0',
        con:'0',
        int:'0',
        wis:'0',
        cha:'0'
    })

    return(
        <div>
            <p>
                <label htmlFor='str_st'>STR</label>
                {decideST('STR')}
            </p>
        </div>
    )
}