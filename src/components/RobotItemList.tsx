import './RobotItemList.css';
import {useContext, useRef, useState} from "react";
import {FaPlus} from "react-icons/fa";
import RobotItem from "./RobotItem";
import Accordion from "./Accordion";
import {ItemContext} from "../context/ItemContext";
import {RobotContext, RobotDispatchContext} from "../context/RobotContext";
import {DatabaseContext} from "../context/DatabaseContext";

const RobotItemList = () => {

    const items = useContext(ItemContext)
    const robots = useContext(RobotContext)
    const dispatchRobots = useContext(RobotDispatchContext)
    const database = useContext(DatabaseContext)


    const dragItem = useRef<number>(0)
    const dragOverItem = useRef<number>(0)
    const [dragging, setDragging] = useState<boolean>(false)
    function getQueryContent(indices: number[]): string {
        let content: string = `>>SELECT TOP 1\n`

        items.forEach(({id, name, values}) =>
            // check if at least one value is non-empty and if the name is not empty
            content += values.some(Boolean) && name.length !== 0 && indices.includes(id)
                ? `\n(SELECT value FROM dbo.${database.table} WHERE parameter='${name}' AND omgeving='<<+Input.Omgeving+>>') AS ${name}`
                : ''
        )

        content += `\n\nFROM dbo.${database.table}<<`
        return content;
    }

    function handleDragStart(index: number) {
        setDragging(true)
        dragItem.current = index;
    }

    function handleDragEnter(index: number) {
        dragOverItem.current = index;
    }

    function handleDragEnd() {
        const copy = [...robots];
        const dragItemContent = copy[dragItem.current];
        copy.splice(dragItem.current, 1);
        copy.splice(dragOverItem.current, 0, dragItemContent);
        dispatchRobots({
            type: 'set',
            value: copy
        })
        setDragging(false)
    }

    return (
        <div className={"robot_list_container"}>
            <div className={"robot_list_header"}>
                <span>Robot queries</span>
            </div>
            <div className={"robot_list"}>
                {robots.map(({id, name, itemIds}, index) =>
                    <Accordion itemIds={itemIds}
                               robotId={id}
                               key={id}
                               onDragStart={() => handleDragStart(index)}
                               onDragEnter={() => handleDragEnter(index)}
                               onDragEnd={handleDragEnd}
                    >
                        <RobotItem key={id}
                                   id={id}
                                   name={name}
                                   itemIds={itemIds}
                                   getQueryContent={getQueryContent}
                        />
                    </Accordion>
                )}
                <div className={"add_button"}
                     onClick={() => dispatchRobots({type: 'add'})}
                >
                    <FaPlus />
                </div>
            </div>
        </div>
    );
}

export default RobotItemList;
