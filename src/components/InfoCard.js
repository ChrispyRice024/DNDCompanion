import {useState, React, useEffect} from 'react'

export default function InfoCard ({functions}) {

    const {character, url, event, isHovering, parentName, spawnCount, setSpawnCount, className, hoveredKey} = functions

    // const url = event?.target?.getAttribute('data-url')

    const [fetchData, setFetchData] = useState({})
    const componentId = `InfoCard_` + `${parentName}`
    console.log(isHovering)
    console.log('InfoCard', parentName)
    useEffect(() => {

        const fetchInfo = async () => {
            console.log(isHovering)
                try{
                    const res = await fetch(`https://www.dnd5eapi.co${url}`)
                    const data = await res.json()
    
                    // console.log('InfoCard', {data})
                    // console.log({character})
                    setFetchData(data)
                }catch(err){
                    console.error(err)
                }
        }
        console.log(hoveredKey)
        fetchInfo()
        
    }, [url])
    // console.log(event.target)
    // console.log(event.target)
    console.log(fetchData)
    console.log(className)
    console.log(parentName)
    return(
        <div id={parentName} >
            <p>
                {/* {console.log(fetchData)} */}
                {fetchData.name}
            </p>
            <p>
                {fetchData.desc}
            </p>
            {parentName === 'Spellcasting_infoCard' ? 
            <span>
                {console.log(fetchData)}
                <p>
                    {fetchData.concentration === true ? '(Requires Concentration)': ''}
                    {fetchData.ritual ? `Ritual` : ''}
                </p>
                 
                    Components: {fetchData?.components?.map((component, i) => {
                        return(
                            <span>
                                {' '}{component}{' '}
                            </span>
                        )
                })}
                 | Duration: {fetchData.duration}{' '}
                 | Range: {fetchData.range}
                 {fetchData.material ? ` | Material: ${fetchData.material}` : ''}
                 <p>
                    {fetchData?.school?.name}
                 </p>
                
            </span> :''}
            
        </div>
    )
}