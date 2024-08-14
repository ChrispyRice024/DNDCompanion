import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function CharFeatures ({char}) {
    const features = char?.primary_class?.features
    return(
        <div>
            {features ?
                features.map((feature, i) => (
                    <div className='char_features'>
                        <p>
                            {feature.name}
                        </p>
                        <p>
                            {feature.desc.map(desc => <span>{desc}</span>)}
                        </p>
                        {feature?.feature_specific?.subfeature_options?.from?.options && char?.primary_class?.chosen_features?.[`feature_${i}`] ? 
                            <div>
                                {char?.primary_class?.chosen_features?.[`feature_${i}`].map((subFeature, j) => (
                                    <div className='sub_feature'>
                                        <p>
                                            {subFeature.name}
                                        </p>
                                        <p>
                                            {subFeature.desc.map(desc => <span>{desc}</span>)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        :''}
                    </div>
                ))
            :''}
        </div>
    )
}