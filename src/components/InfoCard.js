import { useState, React, useEffect } from "react";

export default function InfoCard({ functions }) {
  const {
    character,
    url,
    event,
    isHovering,
    parentName,
    spawnCount,
    setSpawnCount,
    className,
    hoveredKey,
  } = functions;

  const [fetchData, setFetchData] = useState({});
  const [stall, setStall] = useState(0);

  const componentId = `InfoCard_` + `${parentName}`;

  const equipProperties = fetchData?.properties?.map(
    (property) => property.name
  );
  useEffect(() => {
    const fetchInfo = async () => {
      console.log(isHovering);
      try {
        const res = await fetch(`https://www.dnd5eapi.co${url}`);
        const data = await res.json();

        setFetchData(data);
      } catch (err) {
        console.error(err);
      }
    };
    console.log(hoveredKey);
    fetchInfo();
    console.log("InfoCard");
  }, [url]);

//   useEffect(() => {
//     console.log("fetchData", fetchData);
//     console.log("equipmentCategory", fetchData.contents);
//     console.log(className);
//     console.log(parentName);
//   }, [fetchData]);
console.log('character.mods', character.mods)
  return (
    <div id={parentName} className="infoCard">

      <p>{fetchData.name}</p>

      <p>{fetchData?.desc}</p>

      {parentName === "Spellcasting_infoCard" ? (
        <span>

          <p>
            {fetchData.concentration === true ? "(Requires Concentration)" : ""}
            {fetchData.ritual ? `Ritual` : ""}
          </p>
          Components:{" "}
          {fetchData?.components?.map((component, i) => {
            return <span> {component} </span>;
          })}
          | Duration: {fetchData.duration} | Range: {fetchData.range}
          {fetchData.material ? ` | Material: ${fetchData.material}` : ""}
          <p>{fetchData?.school?.name}</p>
        </span>

      ) : parentName === "Equipment_infoCard" && fetchData.damage ? (
        <span>

          {fetchData?.damage?.damage_dice} {fetchData?.damage?.damage_type.name}
          <p>{equipProperties?.join(" | ")}</p>
        </span>

      ) : fetchData?.equipment_category?.index === "adventuring-gear" ? (
        <p>
          {fetchData.contents.map((item, i) => (
            <span>
              {item.quantity} | {item.item.name}
            </span>
          ))}
        </p>
      ) : fetchData?.equipment_category?.index === 'armor' ? (
        <span>
            <p>
                {fetchData.equipment_category.name}
            </p>
            <p>
                AC: {fetchData.armor_class.base} | {fetchData?.armor_class?.dex_bonus ? (
                    fetchData.armor_class.max_bonus ? (
                        <span>Max Dex Bonus: {fetchData?.armor_class?.max_bonus}</span>
                    ) : (
                        <span>Dex Bonus: {character.mods.dexMod} (Dex Mod)</span>
                    )
                ) : (
                    <span>No Dex Bonus</span>
                )}

            </p>
        </span>
      ) : (
        ""
      )}
      {stall === 0 ? setStall(stall+1) : ""}
    </div>
  );
}
