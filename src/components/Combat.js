import React from 'react'
import {useState, useEffect} from 'react'

export default function Combat ({functions}) {

const {fetchData, setFetchData} = functions


    const [baseAc, setBaseAc] = useState(10 + parseInt(fetchData.mods.dex))

    useEffect(() => {

        const equipFetch = async () => {
            const startingEquip = fetchData.primary_class.equip.starting_equip
            console.log(startingEquip)
            const equip = [...fetchData.chosen_equip]
            startingEquip.forEach((item, i) => {

                item.equipment.count = item.quantity
                console.log('item combat', item)
                equip.push(item.equipment)
            })
            let results
            console.log(equip)
            try {
                const fetchUrls = equip.map(async (url) => {
                    const res = await fetch(`https://dnd5eapi.co${url.url}`)
                    if (!res) {
                        console.error(`failed to fetch for ${url.name} at location ${url.url}`)
                    }
                    return res.json()
                })

                results = await Promise.all(fetchUrls)


            } catch (err) {
                console.error(err)
            } finally {
                console.log('results', results)
                const resFinal = results.map(res => {
                    const count = equip.find((x) => x.name === res.name).count

                    res.count = count
                })
                console.log(results)
                setFetchData(prevData => ({
                    ...prevData,
                    equipment: results
                }))
            }
        }

        equipFetch()
    }, [])

    useEffect(() => {
        
        const decideAC = async (data) => {
            if(fetchData?.equipment?.length > 0){

                    fetchData?.equipment.map((item, i) => {
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
        decideAC()
    }, [fetchData?.stats?.dex])
    

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