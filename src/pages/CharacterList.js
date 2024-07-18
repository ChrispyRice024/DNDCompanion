import react from 'react'
import {useState, useEffect} from 'react'
const fs = require("fs");

export default function CharacterList ({}) {

    const [characterData, setCharacterData] =useState([])

    // const [baseAc, setBaseAc] = 

    useEffect(() => {
        fs.readFile('save.json', 'utf8', (err, data) => {
            if(err){
                console.error(err)
            }else{
                setCharacterData(JSON.parse(data))
            }
        })
    }, [])



    // const decideAC = async (char) => {
    //     let baseAc

    //     if(char?.chosen_equip?.length > 0){
    //         const equipUrls = char?.chosen_equip?.map((item, i) => {
    //             return item.url
    //         })
    //         console.log(equipUrls)
    //         try{
    //             const fetchUrls = equipUrls.map((url, i) => fetch(`https://www.dnd5eapi.co${url}`))
    //             const res = await Promise.all(fetchUrls)

    //             res.forEach(res => {
    //                 if(!res){
    //                     throw new Error(`failed to fetch from ${res.url}`)
    //                 }
    //             })
    //             const data = await Promise.all(res.map(res => res.json()))
    //             data.map((item, i) => {
    //                 if(item.equipment_category.name === 'Armor' && item.armor_class.dex_bonus && !item.armor_class.max_bonus){
    //                     console.log('light armor')
    //                     baseAc = (parseInt(item.armor_class.base) + parseInt(char.mods.dex))
    //                     console.log('AC', baseAc)
    //                 }else if(item.equipment_category.name === 'Armor' && item.armor_class.dex_bonus && item.armor_class.max_bonus > 0 && char?.mods.dex >= 2){
    //                     console.log('medium armor')
    //                     baseAc = (parseInt(item.armor_class.base) + parseInt(item.armor_class.max_bonus))
    //                     console.log('AC', baseAc)
    //                 }else if(item.equipment_category.name === 'Armor' && !item.armor_class.dex_bonus){
    //                     console.log('heavy armor')
    //                     baseAc = (item.armor_class.base)
    //                     console.log('AC', baseAc)
    //                 }
    //             })
    //             console.log('data', data)
    //         }catch(err){
    //             console.error(err)
    //         }
    //     }else{
    //         console.log('goodbye')
    //     }
    //     return baseAc
    // }

    console.log('characterData', characterData)
    return(
        <div id='char_list'>
            {characterData?.length > 0 ? 
                characterData?.map((char, i) => {
                    console.log(char)
                    const equipUrls = char?.chosen_equip?.map((item, i) => {
                        return item.url
                    })
                    console.log(equipUrls)
                    return(
                        <div className='char_footnote'>
                            <div className='name'>
                                {char.name}
                            </div>
                            <div>
                                <div className='stats_grid'>
                                    <div className='stat'>
                                        <strong>STR:</strong> {char?.stats?.str}
                                    </div>
                                    <div className='stat'>
                                        <strong>INT:</strong> {char?.stats?.int}
                                    </div>
                                    <div className='stat'>
                                        <strong>DEX:</strong> {char?.stats?.dex}
                                    </div>
                                    <div className='stat'>
                                        <strong>WIS:</strong> {char?.stats?.wis}
                                    </div>
                                    <div className='stat'>
                                        <strong>CON:</strong> {char?.stats?.con}
                                    </div>
                                    <div className='stat'>
                                        <strong>CHA:</strong> {char?.stats?.cha}
                                    </div>
                                </div>
                                <div className='combat'>
                                    
                                        <div className='combat ac'>
                                            {/* {decideAC(char)} */}
                                        </div>
                                        <div>

                                        </div>
                                </div>
                                <div className='traits'>

                                </div>
                            </div>

                            
                        </div>
                    )
                })
            : 'You have no characters'}
        </div>
    )
}