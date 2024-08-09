import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react'

export default function CharEquip ({char}) {

    const lvl = 0
    console.log(char)

    const [spellDisplay, setSpellDisplay] = useState('cantrips')

    let [spells, setSpells] = useState({})
    useEffect(() => {
        const decideSpells = () => {
            const spellsForLvl = char.primary_class.level_data[lvl].spellcasting
            //DIVINE CASTERS HAVE NO LIMIT TO THE SPELLS THEY CAN KNOW
            if (!char.primary_class.level_data[lvl].spellcasting.spells_known) {

                Object.entries(spellsForLvl).forEach(([key, value], i) => {
                    if(key !== 'cantrips_known' && key !== 'spells_known'){
                        console.log(key, value)
                        if (value > 0) {
                            const spellLvl = key.slice(-1)
                            console.log(key)
                            const spellsOfLvl = `level_${spellLvl}_spells`
                            console.log('spellLvl', spellLvl)
                            console.log('spellsOfLvl', spellsOfLvl)
                            console.log(char.primary_class.spells.level_1_spells)
                            setSpells((prevSpells) => ({
                                ...prevSpells,
                                [spellsOfLvl]:
                                    char.primary_class.spells[
                                    `level_${spellLvl}_spells`
                                    ]
                            }))
                        }
                    }
                    
                })
                console.log('spells', spells)
            } else if (char.primary_class.level_data[lvl].spellcasting.spells_known){
                
            }
        }
        decideSpells()
    }, [char])

    useEffect(() => {
        console.log('spells', spells)
    }, [spells])

    return(
        <div id='char_spells'>

            <div className='spell_nav'>
                {char.primary_class.chosen_spells ?
                    Object.entries(char.primary_class.chosen_spells).map(([key, value], i) => {
                        console.log('key, value', key, value)
                        if (key === 'spell_0') {
                            console.log('if')
                            return (
                                <div>
                                    <strong onClick={(e) => { setSpellDisplay('cantrips') }}>Cantrips</strong>
                                </div>
                            )
                        } else {
                            const spellLvl = key.slice(-1)
                            console.log(spellLvl)
                            console.log('else')
                            return (
                                <div>
                                    <strong onClick={(e) => { setSpellDisplay(spellLvl) }}>Level {spellLvl} Spells</strong>
                                </div>
                            )
                        }
                    })
                    : ''}
            </div>

            <div id='char_spell_slots'>
                <p>
                    {char.primary_class.spellcasting.spellcasting_ability ? 
                        <span className={char.primary_class.spellcasting.spellcasting_ability.index}>
                            <strong>Spellcating Mod:</strong> {char.primary_class.spellcasting.spellcasting_ability.name}
                        </span>
                    :''}
                </p>
                {char?.primary_class?.level_data[lvl]?.spellcasting //RENDERS THE SPELL SLOTS AND NUMBER KNOWN SPELLS AND CANTRIPS
                    ? Object.entries(
                        char?.primary_class?.level_data[0]?.spellcasting
                    ).map(([key, value], i) => {
                        if (value !== 0) {
                            const entries = Object.entries(
                                char.primary_class?.level_data[0]
                                    ?.spellcasting
                            )

                            return (
                                <p>
                                    <strong style={{ color: '#FFD700' }}>
                                        {key
                                            .replace(/_/g, ' ')
                                            .replace(/\b\w/g, (char) =>
                                                char.toUpperCase()
                                            )}
                                    </strong>{' '}
                                    ({value}){' '}
                                </p>
                            )
                        }
                    })
                    : ''}
            </div>
            <div id='char_spells'>

                {spellDisplay === 'cantrips' ? 
                    char.primary_class.chosen_spells.spell_0.map((cantrip, i) => (
                        
                        <div className='char_single_spell' key={i}>
                            <p>
                                {cantrip.name} / {cantrip.school.name}
                            </p>
                            <div className='seperator'></div>
                            <p>
                                Casting Components{' '}
                                {cantrip.components.map((component, j) => (
                                    <span>
                                        {component} {j < cantrip.components.length - 1 ? ' | ' :''}
                                    </span>
                                ))}
                            </p>
                            <div className='seperator'></div>
                            <p>
                                {cantrip.casting_time} / {cantrip.duration}
                            </p>
                            <div className='seperator'></div>
                            {cantrip.dc ? 
                            <p>
                                {cantrip.dc.dc_type.name} Save
                            </p>
                            :''}
                            {cantrip.dc ? 
                                <div className='seperator'></div>
                            :''}
                            <p>
                                {cantrip.desc.map(desc => <span>{desc}</span>)}
                            </p>
                            {cantrip.concentration ?
                                <div className='seperator'></div>
                            :''}
                            {cantrip.concentration ?
                                <p>
                                    (Requires Concentration)
                                </p>
                                : ''}
                            {cantrip.dc && cantrip.dc.dc_success === 'other' ?
                                <p>
                                    {cantrip.dc.desc}
                                </p>
                            :cantrip.dc && cantrip.dc.dc_success === 'half' ?
                                <p>
                                    The target will take half damage on a successful save.
                                </p>
                            : cantrip.dc && cantrip.dc.dc_success === 'none' ?
                                <p>
                                    The spell will fail if the target succeedes their save.
                                </p>
                            :''}
                        </div>
                    ))
                : char.primary_class.chosen_spells[`spell_${spellDisplay}`] ? 
                    <div>
                        {char.primary_class.chosen_spells[`spell_${spellDisplay}`].map((spell, i) => (
                            <div className='char_single_spell'>
                                <p>
                                    {spell.name} / {spell.school.name}
                                </p>
                                <div className='seperator'></div>
                                <p>
                                    Casting Components{' '}
                                    {spell.components.map((component, j) => (
                                        <span>
                                            {component} {j < spell.components.length - 1 ? ' | ':''}
                                        </span>
                                    ))}
                                </p>
                                <div className='seperator'></div>
                                <p>
                                    {spell.casting_time} / {spell.duration}
                                </p>
                                <div className='seperator'></div>
                                {spell.dc ? 
                                    <p>
                                        {spell.dc.dc_type.name} Save
                                    </p>
                                :''}
                                {spell.dc ? 
                                    <div className='seperator'></div>
                                :''}
                                <p>
                                    {spell.desc.map(desc => <span>{desc}</span>)}
                                </p>
                                {spell.concentration ? 
                                    <div className='seperator'></div>
                                :''}
                                {spell.concentration ? 
                                    <p>
                                        (Requires Concentration)
                                    </p>
                                :''}
                                {spell.dc && spell.dc.dc_success === 'other' ?
                                    <p>
                                        {spell.dc.desc}
                                    </p>
                                :spell.dc && spell.dc.dc_success === 'half' ?
                                    <p>
                                        The target will take half damage on a successful save.
                                    </p>
                                :spell.dc && spell.dc.dc_success === 'none' ?
                                    <p>
                                        The spell will fail if the target succeeds their save.
                                    </p>
                                :''}
                            </div>
                        ))}
                    </div>
                :''}
                

                {/*{char.primary_class.chosen_spells ? 
                    char.primary_class.chosen_spells.map((spell, i) => {
                        <div>
                            {spell.name}
                        </div>
                    })
                :''}*/}
                {/* {char.primary_class.name === 'Paladin' //probably dont need this conditional. should decide if paladin in decideSpells()
                    ? Object.keys(spells).map((lvl, i) => {
                        console.log('lvl', lvl)
                        spells[lvl].map((spell, j) => (
                            <div>
                                {spell.name}
                            </div>
                        ))
                    })
                    : ''} */}

                
            </div>

        </div>
    )
}