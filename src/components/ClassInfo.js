import {useState, useEffect} from 'react'
import { Children } from 'react';

export default function ClassInfo ({ functions }) {

    const {character} = functions

    const primaryInfo = character?.class?.primary ? character?.class?.primary : {}
    const secondaryInfo = character?.class?.secondary ? character?.class?.secondary : {}

    const [classStats, setClassStats] = useState(null)


    //Proficiencies
    const [proficiencies, setProficiencies] = useState()
    const [proDivs, setProDivs] = useState([])
    useEffect(() => {
        

            const primary = character?.class?.primary
            const isPrimaryEmpty = Object.keys(character?.class?.primary).length === 0
    
            const secondary = character?.class?.secondary
            const isSecondaryEmpty = Object.keys(character?.class?.secondary).length === 0
            
            const decideStyle = !isPrimaryEmpty || !isSecondaryEmpty ? '' : 'none'
            
            
            const getPro = () => {

                const getName = (element, i) => {
                    if(element[i].props.id === 'primaryPro'){
                        return `${primary.name}`
                    }else{
                        return `${secondary.name}`
                    }}

                const fillDiv = () => {
                    
                    if(!isPrimaryEmpty && isSecondaryEmpty){
                        console.log('numbah 1')
                        return setProDivs((prevDiv) => {
                            primary?.proficiencies.map((pro, i) => (
                                <p key={i}>
                                    {pro.name}
                                </p>
                            ))
                        })
                    }else if(isPrimaryEmpty && !isSecondaryEmpty){
                        console.log('numbah 2')
                        return setProDivs((prevDiv) => {
                            primary?.proficiencies.map((pro, i) => (
                                <p key={i}>
                                    {pro.name}
                                </p>
                            ))
                        })
                    }else if (!isPrimaryEmpty && !isSecondaryEmpty){
                        console.log('numbah 3')
                        return setProDivs(
                            <div>
                                <div>
                                    <strong>
                                        {primary.name}
                                    </strong>
                                    {primary?.proficiencies.map((pro, i) => {
                                        <p>
                                            {pro.name}
                                        </p>
                                    })}
                                </div>
                                <div>
                                    <strong>
                                        {primary.name}
                                    </strong>
                                    {secondary?.proficiencies.map((pro, i) => {
                                        <p>
                                            {pro.name}
                                        </p>
                                    })}
                                </div>
                            </div>
                        )
                    }

                    return (
                        <div>
                            <div id='proficiencies' >
                                <strong className='title' >Proficiencies</strong>
                            </div>
                        <div>
                            {proDivs.map((div, i) => (
                                <div key={i}>
                                    {div}
                                </div>
                            ))}
                        </div>
                        </div>
                    )
                }
                fillDiv()
            }
            getPro()
           console.log({proDivs})
    }, [character.class])

    return(
        <div>
            {proDivs}
        </div>
    )
}