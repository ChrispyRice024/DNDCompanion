import react from 'react'
import {useState, useEffect} from 'react'
import {debounce} from 'lodash' 

export default function Stats({functions}) {
    const {setCharacter, character, fetchData, setFetchData} = functions

    const [infoDiv, setInfoDiv] = useState()

    const castingMod = fetchData?.primary_class?.spellcasting?.spellcasting_ability?.name

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
        console.log(statBonus)
        return(parseInt(statBonus))
    }

    useEffect(() => {
        console.log(fetchData?.primary_class?.spellcasting?.spellcasting_ability?.name)
        if(fetchData?.race?.ability_bonuses?.some(obj => obj.ability_score?.index === 'str')){
            console.log('str is a bonus')
            console.log(fetchData?.race?.ability_bonuses?.some(obj => obj.ability_score?.index === 'str'))
        }
    }, [fetchData])
    const handleChange = (e) => {
        
        

        const statValue = parseInt(e.target.value, 10);
        const updatedSkills = {...fetchData?.skills}
                // SETS THE SKILL VALUES
            for(const skillName in updatedSkills){
                const skill = updatedSkills[skillName]
                const statMod = fetchData?.mods[`${skill.stat}`]
                // const racialMod = fetchData?.race?.ability_bonuses?.find(obj => obj.ability_score?.index === skill.stat.toLowerCase())
                // console.log('racialMod', racialMod)
                // console.log(statMod)
                // const isPro = character.proficiencies[`${skill.stat}Pro`]
                
                // if()
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
        
        setFetchData(prevData => ({
            ...prevData,
            stats: {
                ...prevData.stats,
                [e.target.name]: statValue
            },
            mods: {
                ...prevData.mods,
                [`${e.target.name}`]: parseInt((statValue - 10) / 2)
            },
        }))

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
                <strong>STR Mod: </strong> {fetchData?.race?.ability_bonuses?.some(obj => obj.ability_score?.index === 'str') ? <span>{Math.round((((fetchData?.stats.str + decideBonus('str')) - 10) / 2))}</span> : <span>{fetchData?.mods.str}</span>}
                    {/* TOTAL STAT */}
                {fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'str') ? <span> | <strong>Total STR: </strong>{parseInt(fetchData?.stats?.str) + parseInt(decideBonus('str'))}</span> : <span><strong> | Total STR: </strong> {fetchData?.stats?.str}</span>}
                    
                    {/* CASTING MOD */}
                {castingMod === 'STR' ? ' | Casting Mod Is Str' : ''}
                </p>
                <p>
                {/* RACIAL MOD */}
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'str') ? <span><strong>STR Bonus From {fetchData?.race?.name}: </strong> {decideBonus('str')} | </span> :''}

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
                <strong>DEX Mod: </strong> {fetchData?.race?.ability_bonuses?.some(obj => obj.ability_score?.index === 'dex') ? <span>{Math.ceil((((fetchData?.stats.dex + decideBonus('dex')) - 10) / 2))}</span> : <span>{fetchData?.mods.dex}</span>}
                        {/* TOTAL STAT */}
                {fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'dex') ? <span> | <strong>Total STR: </strong>{parseInt(fetchData?.stats?.dex) + parseInt(decideBonus('dex'))}</span> : <span><strong> | Total DEX: </strong> {fetchData?.stats?.dex}</span>}
                        {/* CASTING MOD */}
                {castingMod === 'DEX' ? ' | Casting Mod Is Dex' :''}
                </p>
                <p>
                {/* RACIAL BONUS */}
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'dex') ? <span><strong>DEX Bonus From {fetchData?.race?.name}: </strong> {decideBonus('dex')} | </span> :''}

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
                <strong>CON Mod: </strong> {fetchData?.race?.ability_bonuses?.some(obj => obj.ability_score?.index === 'con') ? <span>{Math.ceil((((fetchData?.stats.con + decideBonus('con')) - 10) / 2))}</span> : <span>{fetchData?.mods.con}</span>}
                        {/* TOTAL STAT */}
                {fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'con') ? <span> | <strong>Total CON: </strong>{parseInt(fetchData?.stats?.con) + parseInt(decideBonus('con'))}</span> : <span><strong> | Total CON: </strong> {fetchData?.stats?.con}</span>}
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
                <strong>INT Mod: </strong> {fetchData?.race?.ability_bonuses?.some(obj => obj.ability_score?.index === 'int') ? <span>{Math.ceil((((fetchData?.stats.int + decideBonus('int')) - 10) / 2))}</span> : <span>{fetchData?.mods.int}</span>}
                    {/* TOTAL STAT */}
                {fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'int') ? <span> | <strong>Total INT: </strong>{parseInt(fetchData?.stats?.int) + parseInt(decideBonus('int'))}</span> : <span><strong> | Total INT: </strong> {fetchData?.stats?.int}</span>}
                        {/* CASTING MOD */}
                {castingMod === 'INT' ? ' | Casting Mod Is INT' :''}
            </p>
            <p>
                {/* RACIAL BONUS */}
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'int') ? <span><strong>INT Bonus From {fetchData?.race?.name}: </strong> {decideBonus('int')} | </span> :''}

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
                <strong>WIS Mod: </strong> {fetchData?.race?.ability_bonuses?.some(obj => obj.ability_score?.index === 'wis') ? <span>{Math.ceil((((fetchData?.stats.wis + decideBonus('wis')) - 10) / 2))}</span> : <span>{fetchData?.mods.wis}</span>}
                    {/* TOTAL STAT */}
                {fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'wis') ? <span> | <strong>Total WIS: </strong>{parseInt(fetchData?.stats?.wis) + parseInt(decideBonus('wis'))}</span> : <span><strong> | Total WIS: </strong> {fetchData?.stats?.wis}</span>}
                    {/* CASTING MOD */}
                {castingMod === 'WIS' ? ' | Casting Mod Is Wis' : ''}
                {/* RACIAL BONUS */}
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'wis') ? <span><strong>WIS Bonus From {fetchData?.race?.name}: </strong> {decideBonus('wis')} | </span> :''}
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
                <strong>CHA Mod: </strong> {fetchData?.race?.ability_bonuses?.some(obj => obj.ability_score?.index === 'cha') ? <span>{Math.ceil((((fetchData?.stats.cha + decideBonus('cha')) - 10) / 2))}</span> : <span>{fetchData?.mods.cha}</span>}
                    {/* TOTAL STAT */}
                {fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'cha') ? <span> | <strong>Total CHA: </strong>{Math.ceil(parseInt(fetchData?.stats?.cha) + parseInt(decideBonus('cha')))}</span> : <span><strong> | Total CHA: </strong> {fetchData?.stats?.cha}</span>}
                    {/* CASTING MOD */}
                {castingMod === 'CHA' ? ' | Casting Mod Is CHA' :''}
                </p>
                <p>
                {/* RACIAL BONUS */}
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'cha') ? <span><strong>CHA Bonus From {fetchData?.race?.name}: </strong> {decideBonus('cha')} | </span> :''}

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