import React from 'react'
import {useState, useEffect} from 'react'

export default function Skills ({functions}) {

    const {fetchData} = functions

    const decideProficiency = (skill) => {
        
        const proficiencies = fetchData?.primary_class?.chosen_pro_0 || []

        if( proficiencies.some(pro => pro.name === `Skill: ${skill}`)){
            return 2
        }else{
            return 0
        }
    }

    return(
        <div id='skillsOuter'>
            <h2>Skills</h2>
            <div id='skillsInner'>
                <p className='dex'>
                    <strong>Acrobatics: </strong>
                    {parseInt(decideProficiency('Acrobatics')) + fetchData.mods.dex}<br></br>
                    {parseInt(decideProficiency('Acrobatics')) === 2 ? <strong> | Proficient</strong> :''}
                </p>

                <p className='wis'>
                    <strong>AnimalHandling: </strong>
                    {parseInt(decideProficiency('Animal Handling')) + fetchData.mods.wis}<br></br>    
                    {parseInt(decideProficiency('Acrobatics')) === 2 ? <strong>Proficient</strong> :''}
                
                </p>

                <p className='int'>
                    <strong>Arcana: </strong>
                    {parseInt(decideProficiency('Arcana')) + fetchData.mods.int}<br></br>    
                    {parseInt(decideProficiency('Arcana')) === 2 ? <strong>Proficient</strong> :''}
                </p>

                <p className='str'>
                    <strong>Athletics: </strong>
                    {parseInt(decideProficiency('Athletics')) + fetchData.mods.str}<br></br>    
                    {parseInt(decideProficiency('Athletics')) === 2 ? <strong>Proficient</strong> :''}
                </p>

                <p className='cha'>
                    <strong>Deception: </strong>
                    {parseInt(decideProficiency('Deception')) + fetchData.mods.cha}<br></br>    
                    {parseInt(decideProficiency('Deception')) === 2 ? <strong>Proficient</strong> :''}
                </p>

                <p className='int'>
                    <strong>History: </strong>
                    {parseInt(decideProficiency('History')) + fetchData.mods.int}<br></br>    
                    {parseInt(decideProficiency('History')) === 2 ? <strong>Proficient</strong> :''}
                </p>

                <p className='wis'>
                    <strong>Insight: </strong>
                    {parseInt(decideProficiency('Insight')) + fetchData.mods.wis}<br></br>    
                    {parseInt(decideProficiency('Insight')) === 2 ? <strong>Proficient</strong> :''}
                </p>

                <p className='cha'>
                    <strong>Intimidation: </strong>
                    {parseInt(decideProficiency('Intimidation')) + fetchData.mods.cha}<br></br>    
                    {parseInt(decideProficiency('Intimidation')) === 2 ? <strong>Proficient</strong> :''}
                </p>

                <p className='int'>
                    <strong>Investigation: </strong>
                    {parseInt(decideProficiency('Investigation')) + fetchData.mods.int}<br></br>    
                    {parseInt(decideProficiency('Investigation')) === 2 ? <strong>Proficient</strong> :''}
                </p>

                <p className='wis'>
                    <strong>Medicine: </strong>
                    {parseInt(decideProficiency('Medicine')) + fetchData.mods.wis}<br></br>    
                    {parseInt(decideProficiency('Medicine')) === 2 ? <strong>Proficient</strong> :''}
                </p>

                <p className='int'>
                    <strong>Nature: </strong>
                    {parseInt(decideProficiency('Nature')) + fetchData.mods.int}<br></br>    
                    {parseInt(decideProficiency('Nature')) === 2 ? <strong>Proficient</strong> :''}
                </p>

                <p className='wis'>
                    <strong>Perception: </strong>
                    {parseInt(decideProficiency('Perception')) + fetchData.mods.wis}<br></br>    
                    {parseInt(decideProficiency('Perception')) === 2 ? <strong>Proficient</strong> :''}
                </p>

                <p className='cha'>
                    <strong>Performance: </strong>
                    {parseInt(decideProficiency('Performance')) + fetchData.mods.cha}<br></br>    
                    {parseInt(decideProficiency('Performance')) === 2 ? <strong>Proficient</strong> :''}
                </p>

                <p className='cha'>
                    <strong>Persuassion: </strong>
                    {parseInt(decideProficiency('Persuassion')) + fetchData.mods.cha}<br></br>    
                    {parseInt(decideProficiency('Persuassion')) === 2 ? <strong>Proficient</strong> :''}
                </p>

                <p className='int'>
                    <strong>Religion: </strong>
                    {parseInt(decideProficiency('Religion')) + fetchData.mods.int}<br></br>    
                    {parseInt(decideProficiency('Religion')) === 2 ? <strong>Proficient</strong> :''}
                </p>

                <p className='dex'>
                    <strong>Slight Of Hand: </strong>
                    {parseInt(decideProficiency('Slight Of Hand')) + fetchData.mods.dex}<br></br>    
                    {parseInt(decideProficiency('Slight Of Hand')) === 2 ? <strong>Proficient</strong> :''}
                </p>

                <p className='dex'>
                    <strong>Stealth: </strong>
                    {parseInt(decideProficiency('Stealth')) + fetchData.mods.dex}<br></br>    
                    {parseInt(decideProficiency('Stealth')) === 2 ? <strong>Proficient</strong> :''}
                </p>

                <p className='wis'>
                    <strong>Survival: </strong>
                    {parseInt(decideProficiency('Survival')) + fetchData.mods.wis}<br></br>    
                    {parseInt(decideProficiency('Survival')) === 2 ? <strong>Proficient</strong> :''}
                </p>
            </div>
             
        </div>
    )
}