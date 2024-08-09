import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function CharEquip ({char}) {
    
    const equipment = char.equipment
    return(
        <div id='char_equip'>
            {equipment.map((item, i) => (
                <div className='single_equip'>
                    {item?.equipment_category?.name === 'Weapon' ? ( //still other equip types i need to get. must fix the equip component first
                        <div className='char_weapon'>
                            <p>
                                {console.log(item.two_handed_damage)}
                                ({item.count}) {item.name} / {item.damage.damage_dice}
                                {item.properties.some(
                                    (x) => x.name === 'Versatile'
                                ) ? (
                                    <>
                                        (
                                        {item.two_handed_damage.damage_dice}
                                        )
                                    </>
                                ) : (
                                    ''
                                )}{' '}
                                {item.damage.damage_type.name}
                            </p>
                            <>
                                {item.desc.map((desc, j) => (
                                    <p>{desc}</p>
                                ))}
                            </>
                            <p>
                                {item.special.length > 0 ??
                                    item.special.map((special, j) => (
                                        <>{special}</>
                                    ))}
                            </p>
                            <p>
                                {item.category_range} ({item.range.normal}
                                ft) |{' '}
                                {item.properties.map((prop, j) => (
                                    <>
                                        {prop.name}
                                        {item.properties.length - 1 > j ?
                                            ' | ' : ''}
                                    </>
                                ))}
                            </p>
                            <p>
                                {item.cost.quantity} {item.cost.unit} |{' '}
                                {item.weight} lbs
                            </p>
                        </div>
                    ) : item.equipment_category.name ===
                        'Adventuring Gear' ? (
                        <div>
                            <p>
                                ({item.count}) {item.name} ({item.count})
                            </p>
                            <p>
                                {item.gear_category.name}
                            </p>
                            {item.weight && item.cost ?
                                <p>
                                    {item.cost.quantity} {item.cost.unit} | {item.weight} lbs
                                </p>
                                : !item.weight && item.cost ?
                                    <p>
                                        {item.cost.quantity} {item.cost.unit}
                                    </p>
                                    : ''}
                            {item.contents.length > 0 ?
                                <p>
                                    {item.contents.map((content, j) => (
                                        <span>
                                            {content.quantity} {content.item.name}{j < item.contents.length - 1 ? ' | ' : ''}
                                        </span>
                                    ))}
                                </p>
                                : ''}
                        </div>
                    ) : item.equipment_category.name === 'Armor' ? (
                        <div>
                            <p>
                                ({item.count}) {item.name} / {' '}
                                {!item.armor_class.dex_bonus ?
                                    <>
                                        AC: {item.armor_class.base}
                                    </>
                                    : item.armor_class.dex_bonus && !item.armor_class.max_bonus ?
                                        <>
                                            AC: {item.armor_class.base + char.mods.dex} (Base AC = {item.armor_class.base} + Dex Mod)
                                        </>
                                        : item.armor_class.dex_bonus && item.armor_class.max_bonus ?
                                            <>
                                                AC: {item.armor_class.base + (char.mods.dex > item.armor_class.max_bonus ? item.armor_class.max_bonus : char.mods.dex)} (Base AC = {item.armor_class.base} + Max 2 Dex)
                                            </>
                                            : ''}
                            </p>
                            <p>
                                {item.armor_category} Armor {item.str_minimum > 0 ? <span> | {item.str_minimum} </span> : ''}
                            </p>
                            <p>
                                {item.stealth_disadvantage ? 'Disadvatage on Stealth' : 'No Disadvantage on Stealth'}
                            </p>
                            <p>
                                {item.cost.quantity} {item.cost.unit} | {item.weight} lbs
                            </p>

                        </div>
                    ) : (
                        `${item.equipment_category.name}`
                    )}
                </div>
            ))}
        </div>
    )
}