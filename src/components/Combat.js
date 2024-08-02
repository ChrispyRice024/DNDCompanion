import React from 'react'
import {useState, useEffect} from 'react'

export default function Combat ({functions}) {

const {fetchData} = functions


    const [baseAc, setBaseAc] = useState(10 + parseInt(fetchData.mods.dex))

    useEffect(() => {

        const equipFetch = async () => {
            const startingEquip = Object.values(fetchData.primary_class.equip.starting_equip)
            const equip = [...fetchData.chosen_equip]
            startingEquip.forEach((item, i) => {
                
                
                item.equipment.choose = item.quantity
                console.log('item combat', item)
                equip.push(item.equipment)
                console.log(equip)
            })
            console.log('combat equip', equip)
            console.log('startingEquip', startingEquip)
            try{

            }catch(err){
                console.error(err)
            }
        }
        equipFetch()
        const decideAC = async (data) => {
            if(fetchData?.chosen_equip?.length > 0){

                    fetchData?.chosen_equip.map((item, i) => {
                        console.log('item', item)
                        if(item.equipment_category.name === 'Armor' && item.armor_class.dex_bonus && !item.armor_class.max_bonus){
                            console.log('light armor')
                             setBaseAc(parseInt(item.armor_class.base) + parseInt(fetchData.mods.dex))
                            console.log('AC', baseAc)
                        }else if(item.equipment_category.name === 'Armor' && item.armor_class.dex_bonus && item.armor_class.max_bonus > 0 && fetchData?.mods.dex >= 2){
                            console.log('medium armor')
                            setBaseAc(parseInt(item.armor_class.base) + parseInt(item.armor_class.max_bonus))
                            console.log('AC', baseAc)
                        }else if(item.equipment_category.name === 'Armor' && !item.armor_class.dex_bonus){
                            console.log('heavy armor')
                            setBaseAc(item.armor_class.base)
                            console.log('AC', baseAc)
                        }
                    })
                    console.log('data', data)

                console.log('goodbye')
            }
        }
        // decideAC()
    }, [fetchData.chosen_equip, fetchData?.stats?.dex])
    

    return(
        <div>
            <button onClick={(e) => {e.preventDefault();console.log(fetchData.chosen_equip)}}>ChosenEquip</button>
            <h2>Combat</h2>
            <p>
                {fetchData?.primary_class?.name ? <span><strong>Hit Die: </strong>1d{fetchData?.primary_class?.hit_die}</span> :''}
            </p>
            <p className='con'>
                <strong>HP: </strong>
                {fetchData?.primary_class?.name ? parseInt(fetchData?.primary_class?.hit_die) + parseInt(fetchData?.mods?.con) : <span>{fetchData?.mods?.con}</span>}
            </p>
            <p className='dex'>
                <strong>Armor Class: </strong>
                {baseAc}
            </p>
            <p className='dex'>
                <strong>Initiative Bonus: </strong>
                {fetchData.mods.dex}
            </p>
            <p>
                <strong>Proficiency Bonus: </strong>
                {fetchData?.primary_class ? <span>{fetchData?.primary_class?.level_data[0]?.prof_bonus}</span> : '0'}
            </p>
            <p>
                <strong>Speed: </strong>
                {fetchData?.race ? fetchData.race.speed : 0}
            </p>
        </div>
    )
}