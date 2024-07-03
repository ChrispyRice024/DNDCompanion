import React from 'react'
import {useState, useEffect} from 'react'

export default function Combat ({functions}) {

const {setCharacter, character, sendCharacter, fetchData} = functions

    const [div, setDiv] = useState()

    const [baseAc, setBaseAc] = useState(10 + parseInt(fetchData.mods.dex))

    const decideAC = async () => {
        if(fetchData?.chosen_equip.length > 0){
            const equipUrls = fetchData?.chosen_equip?.map((item, i) => {
                return item.url
            })
            console.log(equipUrls)
            try{
                const res = await new Promise.all(equipUrls)
                const data = res.json()

                console.log(data)
            }catch(err){

            }
        }
    }
    console.log(fetchData?.primary_class)
    useEffect(() => {

        const decideAC = async () => {
            if(fetchData?.chosen_equip?.length > 0){
                const equipUrls = fetchData?.chosen_equip?.map((item, i) => {
                    return item.url
                })
                console.log(equipUrls)
                try{
                    const fetchUrls = equipUrls.map((url, i) => fetch(`https://www.dnd5eapi.co${url}`))
                    const res = await Promise.all(fetchUrls)

                    res.forEach(res => {
                        if(!res){
                            throw new Error(`failed to fetch from ${res.url}`)
                        }
                    })
                    const data = await Promise.all(res.map(res => res.json()))
                    data.map((item, i) => {
                        if(item.equipment_category.name === 'Armor' && item.armor_class.dex_bonus && !item.armor_class.max_bonus){
                            console.log('light armor')
                            setBaseAc(parseInt(item.armor_class.base) + parseInt(fetchData.mods.dex))
                            console.log(baseAc)
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
                }catch(err){
                    console.error(err)
                }
            }else{
                console.log('goodbye')
            }
        }
        decideAC()
    }, [fetchData.chosen_equip])
    
    const handleChange = (e) => {
        const statValue = parseInt(e.target.value, 10)

        setCharacter(prevCharacter => ({
            ...prevCharacter,
            combat: {
                ...prevCharacter.combat,
                [e.target.name]: statValue
            }
        }))
    }

    useEffect(() => {
        setDiv(
            <div>
                
            </div>
        )
    }, fetchData)

    return(
        <div>
            <h2>Combat</h2>
            <p>
                <strong>HP: </strong>
                {fetchData?.primary_class?.name ? parseInt(fetchData?.primary_class?.hit_die) + parseInt(fetchData?.mods?.con) : <span>{fetchData?.mods?.con}</span>}
            </p>
            <p>
                <strong>Armor Class: </strong>
                {baseAc}
            </p>
            <p>
                <strong>Proficiency Bonus: </strong>
                {fetchData?.primary_class ? <span>{fetchData?.primary_class?.level_data[0]?.prof_bonus}</span> : '0'}
            </p>
            <p>
                <strong>Initiative Bonus: </strong>
                {fetchData.mods.dex}
            </p>
            <p>
                <strong>Speed: </strong>
                {fetchData?.race ? fetchData.race.speed : 0}
            </p>
        </div>
    )
}