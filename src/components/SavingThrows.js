import React from 'react'
import {useState, useEffect} from 'react'


export default function SavingThrows ({functions}) {
    const {fetchData, character} = functions

    const proBonus = fetchData?.primary_class?.level_data[0]?.prof_bonus

    const decideST = (stat) => {
        let isProficient
        const statValue = fetchData?.mods?.[stat]
        
        const hasBonus = fetchData?.race?.ability_bonuses?.some(obj => obj.ability_score?.index === stat)

        fetchData?.primary_class?.saving_throws?.forEach((obj) => {

            if(obj.index === stat){
                isProficient = true
            }
        })

        if(isProficient){
            return statValue
        }else{
            return statValue
        }
    }

    return(
        <div>
            <p>
                <h2>Saving Throws</h2>
            </p>
            <p className='str'>
                <strong>STR: </strong>
                <span>{decideST('str')}</span>
                <span>{}</span>
            </p>
            <p className='dex'>
                <strong>DEX: </strong>
                <span>{decideST('dex')}</span>
            </p>
            <p className='con'>
                <strong>CON: </strong>
                <span>{decideST('con')} </span>
            </p>
            <p className='int'>
                <strong>INT: </strong>
                <span>{decideST('int')} </span>
            </p>
            <p className='wis'>
                <strong>WIS: </strong>
                <span>{decideST('wis')} </span>
            </p>
            <p className='cha'>
                <strong>CHA: </strong>
                <span>{decideST('cha')} </span>
            </p>
        </div>
    )
}