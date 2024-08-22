import {useState, useEffect} from 'react'

export default function Class ({functions}) {

    const {fetchData, setFetchData, classFetchCall} = functions

    const [optionDiv, setOptionDiv] = useState()



    useEffect(() => {
        console.log(fetchData?.classList)
    }, [fetchData?.class_list])
    //sets the multiclass logic for the secondary class
    const [multiClassDiv, setMultiClassDiv] = useState()

    //Fetching the equip choices 
    useEffect(() => {
        let choiceUrls = []
        console.log(fetchData?.primary_class?.equip?.equip_options)
        const options = fetchData?.primary_class?.equip?.equip_options
        // const choice = options.find(obj => obj.)
        for(let i=0; i < options?.length; i++){
            
            if(options[i].from.option_set_type === 'options_array'){
            
                for(let j=0; j < options[i]?.from?.options?.length; i++){
            
                    const item = options[i]?.from?.options[j]
                    if(item.option_type === 'multiple'){
                        for(let k=0; k < item.items.length; i++){
                            if(item.items[k].option_type === 'choice'){
                                
                            }
                        }
                        console.log('hello')
                        choiceUrls.push(item?.choice?.from?.equipment_category?.url)
                        console.log('choiceUrls', choiceUrls)
                    }
                }
            }
        }
    }, [fetchData?.primary_class?.className])

    const verifyInput = (e) => {
        const input = e.target.value
        const inputName = e.target.name

        const compare = fetchData.class_list.results.some(element => element.name === input) || fetchData.class_list.results.some(element => element.name.toLowerCase() === input)
        // const url = e?.target?.list?.querySelector(`option[value='${e.target.value}']`)?.getAttribute('data-url')
        const selected = e.target.options[e.target.selectedIndex]
        const url = selected.getAttribute('data-url')

        if(inputName === 'primaryClass' && compare){
            console.log('is true')
            classFetchCall(url, 'primary_class')
        }else{
            console.log('is false')
        }
    }

    useEffect(() => {
        setOptionDiv(
            <div>
                <div>
                    <p>
                        <h2>Primary Class</h2>
                    </p>
                    {/* <input name='primaryClass' list='primaryClassList' onChange={verifyInput} autoComplete='on' id='primaryClass' className='class' placeholder='Class' /> */}
                    <p>
                        <select name='primaryClass' onChange={verifyInput} id='primaryClassList' defaultValue=''>
                            <option value='' disabled>Select A Class</option>
                            {fetchData?.class_list?.results?.map((item, i) => (
                                <option
                                key={i}
                                data-url={item.url}
                                value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </p>
                    
                </div>
            </div>
        )

    }, [fetchData.class_list])

    return(
        <div>
           {optionDiv}
           {multiClassDiv}
        </div>
    )
}