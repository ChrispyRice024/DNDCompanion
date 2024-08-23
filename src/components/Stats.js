import react from 'react'
import {useState, useEffect} from 'react'
import {debounce} from 'lodash' 

export default function Stats({functions}) {
    const {setCharacter, character, fetchData, setFetchData} = functions

    const [infoDiv, setInfoDiv] = useState()

    const castingMod = fetchData?.primary_class?.spellcasting?.spellcasting_ability?.name

    useEffect(() => {
        setFetchData(prevData => ({
            ...prevData,
            hp: parseInt(fetchData.mods.con + fetchData?.primary_class?.hit_die)
        }))
    }, [fetchData?.mods, fetchData?.primary_class])
    
    useEffect(() => {
        console.log(fetchData)
        
        for(const [stat, value] of Object.entries(fetchData?.stats)){
            console.log(stat, value)
            const hasBonus = fetchData?.race?.ability_bonuses?.find(obj => obj.ability_score?.index === stat)
            
            if(hasBonus){
                console.log('hasBonus')
                setFetchData(prevData => ({
                    ...prevData,
                    stats:{
                        ...prevData.stats,
                        [stat]:hasBonus.bonus + value
                    },
                    mods:{
                        ...prevData.mods,
                        [stat]:Math.floor(((value + hasBonus.bonus) - 10) / 2)
                    }
                }))
            }else{
                console.log('no Bonus')
            }
        }
    }, [fetchData?.race])

    const decideBonus = (stat) => {
        const bonuses = fetchData?.race?.ability_bonuses
        let statBonus

        bonuses?.forEach(bonus => {
            // console.log(stat, bonus?.ability_score?.index)
            if(bonus?.ability_score?.index === stat){
                // console.log('right', bonus?.bonus)
                statBonus = bonus?.bonus
            }
        })
        return statBonus

    }

    const handleChange = (e) => {
        
        

        const statValue = parseInt(e.target.value, 10);
        console.log(e.target.name, e.target.value)
        const updatedSkills = {...fetchData?.skills}
                // SETS THE SKILL VALUES
            for(const skillName in updatedSkills){
                const skill = updatedSkills[skillName]
                const statMod = fetchData?.mods[`${skill.stat}`]

                const proficiencyBonus =  0

                updatedSkills[skillName] = {
                    ...skill,
                    value:statMod + proficiencyBonus
                }
            }
        setFetchData(prevCharacter => ({
            ...prevCharacter,
            skills: updatedSkills
        }))

        // SETS THE STAT AND MOD VALUES
        let hasRacialBonus
        console.log(e.target.name)
        const hasBonus = fetchData?.race?.ability_bonuses?.find(obj => obj.ability_score?.index === e.target.name)
        console.log('hasBonus', hasBonus)
        console.log('the bonus', hasBonus)
        if(hasBonus){
            // const bonus = fetchData?.race?.ability_bonuses?.some(obj => )
            console.log(e.target.name, 'has bonus')
            console.log('the mod', Math.floor(((statValue + hasBonus.bonus) - 10) / 2))
            setFetchData(prevData => ({
                ...prevData,
                stats: {
                    ...prevData.stats,
                    [e.target.name]: hasBonus.bonus + statValue
                },
                mods:{
                    ...prevData.mods,
                    [`${e.target.name}`]:Math.floor(((statValue + hasBonus.bonus) - 10) / 2)
                }
            }))
        }else{
            console.log(e.target.name, 'no bonus')
            setFetchData(prevData => ({
                ...prevData,
                stats: {
                    ...prevData.stats,
                    [e.target.name]: statValue
                },
                mods: {
                    ...prevData.mods,
                    [`${e.target.name}`]: Math.floor((statValue - 10) / 2)
                },
            }))
        }

    };

    return(
        <div>
            
            <h2>Stats</h2>
            <p className='str'>
                <label className='str statLabel' htmlFor='str-input'>STR</label>
                <input
                    name='str'
                    id='str-input'
                    type='number'
                    className='stat'
                    defaultValue='10'
                    onChange={handleChange}
                    />
                                        {/* STAT MOD */}
                <strong>STR Mod: </strong> <span>{fetchData?.mods.str}</span>
                    {/* TOTAL STAT */}
                <span> | <strong>Total STR: </strong>{parseInt(fetchData?.stats?.str)}</span>
                    
                    {/* CASTING MOD */}
                {castingMod === 'STR' ? ' | Casting Mod Is Str' : ''}
                </p>
                <p>
                {/* RACIAL MOD */}
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'str') ? <span><strong>STR Bonus From {fetchData?.race?.name}: </strong> {decideBonus('str')} </span> :''}

                    {/* PREREQUISITES */}
                <span>
                    {character?.secondary_class?.multi_classing?.prerequisites
                        ? character.class.secondary.multiClassing.prerequisites.map((prereq, i) => {
                            if(prereq.ability_score.index === 'str'){
                                return(
                                    <span>
                                        *{character.class.secondary.className} Requires {prereq.minimum_score} STR for Multiclass
                                    </span>
                                )
                            }
                            return null
                        }) : ''}
                </span>
                {infoDiv}
            </p>

            <p className='dex'>
                <label className='dex statLabel' htmlFor='dex-input'>DEX</label>
                <input
                    name='dex'
                    id='dex-input'
                    type='number'
                    className='stat'
                    defaultValue='10'
                    onChange={handleChange}
                    />
                        {/* STAT MOD */}
                <strong>DEX Mod: </strong> <span>{fetchData?.mods.dex}</span>
                        {/* TOTAL STAT */}
                <span> | <strong>Total STR: </strong>{fetchData?.stats?.dex}</span>
                        {/* CASTING MOD */}
                {castingMod === 'DEX' ? ' | Casting Mod Is Dex' :''}
                </p>
                <p>
                {/* RACIAL BONUS */}
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'dex') ? <span><strong>DEX Bonus From {fetchData?.race?.name}: </strong> {decideBonus('dex')}</span> :''}

                        {/* PREREQUISITES */}
                <span>
                    {fetchData?.secondary_class?.multi_classing?.prerequisites
                        ? fetchData?.secondary_class?.multi_classing?.prerequisites.map((prereq, i) => {
                            if(prereq.ability_score.index === 'dex'){
                                return(
                                    <span>
                                        *{character.class.secondary.className} Requires {prereq.minimum_score} dex for Multiclass
                                    </span>
                                )
                            }
                            return null
                        }) : ''}
                </span>
                {infoDiv}
            </p>

            <p className='con'>
                <label className='con statLabel' htmlFor='con-input'>CON</label>
                <input
                    name='con'
                    id='con-input'
                    type='number'
                    className='stat'
                    defaultValue='10'
                    onChange={handleChange}
                    />
                        {/* STAT MOD */}
                <strong>CON Mod: </strong><span>{fetchData?.mods.con}</span>
                        {/* TOTAL STAT */}
                <span> | <strong>Total CON: </strong>{parseInt(fetchData?.stats?.con)}</span>
                        {/* CASTING MOD */}
                {castingMod === 'Con' ? ' | Casting Mod Is CON' :''}
                </p>
                <p>
                {/* RACIAL BONUS */}
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'con') ? <span><strong>CON Bonus From {fetchData?.race?.name}: </strong> {decideBonus('con')}</span> :''}

                        {/* PREREQUISITES */}
                <span>
                    {character?.class.secondary?.multiClassing?.prerequisites
                        ? fetchData?.secondary_class?.multi_classing?.prerequisites.map((prereq, i) => {
                            if(prereq.ability_score.index === 'con'){
                                return(
                                    <span>
                                        *{character.class.secondary.className} Requires {prereq.minimum_score} con for Multiclass
                                    </span>
                                )
                            }
                            return null
                        }) : ''}
                </span>
                {infoDiv}
            </p>

            <p className='int'>
                <label className='int statLabel' htmlFor='int-input'>INT</label>
                <input
                    name='int'
                    id='int-input'
                    type='number'
                    className='stat'
                    defaultValue='10'
                    onChange={handleChange}
                    />
                    {/* STAT MOD */}
                <strong>INT Mod: </strong><span>{fetchData?.mods?.int}</span>
                    {/* TOTAL STAT */}
                <span> | <strong>Total INT: </strong>{fetchData?.stats?.int}</span>
                        {/* CASTING MOD */}
                {castingMod === 'INT' ? ' | Casting Mod Is INT' :''}
            </p>
            <p>
                {/* RACIAL BONUS */}
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'int') ? <span><strong>INT Bonus From {fetchData?.race?.name}: </strong> {decideBonus('int')}</span> :''}

                        {/* PREREQUISITES */}
                <span>
                    {fetchData?.secondary_class?.multi_classing?.prerequisites
                        ? fetchData?.secondary_class?.multi_classing?.prerequisites.map((prereq, i) => {
                            if(prereq.ability_score.index === 'int'){
                                return(
                                    <span>
                                        *{character.class.secondary.className} Requires {prereq.minimum_score} int for Multiclass
                                    </span>
                                )
                            }
                            return null
                        }) : ''}
                </span>
                {infoDiv}
            </p>

            <p className='wis'>
                <label className='wis statLabel' htmlFor='wis-input'>WIS</label>
                <input
                    name='wis'
                    id='wis-input'
                    type='number'
                    className='stat'
                    defaultValue='10'
                    onChange={handleChange}
                    />
                    {/* STAT MOD */}
                <strong>WIS Mod: </strong><span>{fetchData?.mods.wis}</span>
                    {/* TOTAL STAT */}
                <span> | <strong>Total WIS: </strong>{fetchData?.stats?.wis}</span>
                    {/* CASTING MOD */}
                {castingMod === 'WIS' ? ' | Casting Mod Is Wis' : ''}
                {/* RACIAL BONUS */}
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'wis') ? <span><strong>WIS Bonus From {fetchData?.race?.name}: </strong> {decideBonus('wis')}</span> :''}
                </p>
                <p>
                    {/* PREREQUISITES */}
                <span>
                    {fetchData?.secondary_class?.multi_classing?.prerequisites
                        ? fetchData?.secondary_class?.multi_classing?.prerequisites.map((prereq, i) => {
                            if(prereq.ability_score.index === 'wis'){
                                return(
                                    <span>
                                        *{character.class.secondary.className} Requires {prereq.minimum_score} wis for Multiclass
                                    </span>
                                )
                            }
                            return null
                        }) : ''}
                </span>
                {infoDiv}
            </p>

            <p className='cha'>
                <label className='cha statLabel' htmlFor='cha-input'>CHA</label>
                <input
                    name='cha'
                    id='cha-input'
                    type='number'
                    className='stat'
                    defaultValue='10'
                    onChange={handleChange}
                    />
                    {/* STAT MOD */}
                <strong>CHA Mod: </strong> <span>{fetchData?.mods.cha}</span>
                    {/* TOTAL STAT */}
                <span> | <strong>Total CHA: </strong>{fetchData?.stats?.cha}</span>
                    {/* CASTING MOD */}
                {castingMod === 'CHA' ? ' | Casting Mod Is CHA' :''}
                </p>
                <p>
                {/* RACIAL BONUS */}
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'cha') ? <span><strong>CHA Bonus From {fetchData?.race?.name}: </strong> {decideBonus('cha')}</span> :''}

                    {/* PREREQUISITES */}
                <span>
                    {fetchData?.secondary_class?.multi_classing?.prerequisites
                        ? fetchData?.secondary_class?.multi_classing?.prerequisites.map((prereq, i) => {
                            if(prereq.ability_score.index === 'cha'){
                                return(
                                    <span>
                                        *{character.class.secondary.className} Requires {prereq.minimum_score} cha for Multiclass
                                    </span>
                                )
                            }
                            return null
                        }) : ''}
                </span>
                {infoDiv}
            </p>

        </div>
    )
}