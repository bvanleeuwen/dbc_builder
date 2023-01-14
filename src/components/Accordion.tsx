import './Accordion.css';
import {useContext, useEffect, useState} from "react";
import {FaCaretRight, FaPlus, FaTimes} from "react-icons/fa";
import Modal from "./Modal";
import {ItemContext} from "../context/ItemContext";
import {RobotContext, RobotDispatchContext} from "../context/RobotContext";

export interface IAccordion {
    itemIds: number[]
    robotId: number
    key?: number
    onDragStart?: () => void
    onDragEnter?: () => void
    onDragEnd?: () => void
    children: any
}

const Accordion = (props : IAccordion) => {

    const items = useContext(ItemContext)
    const robots = useContext(RobotContext)
    const dispatchRobots = useContext(RobotDispatchContext);

    const [open, setOpen] = useState<boolean>(false)
    const [modalState, setModalState] = useState<boolean>(false)

    useEffect(() => {
        if (items.filter(item => !props.itemIds.includes(item.id)).length === 0) {
            setModalState(false)
        }
    }, [items, props.itemIds, robots])

    return (
        <div className={"accordion_container"}>
            <div className={"accordion_header"}
                 onDragStart={props.onDragStart}
                 onDragEnter={props.onDragEnter}
                 onDragEnd={props.onDragEnd}
                 draggable
            >
                <FaCaretRight className={`accordion_handle ${open ? "open" : ""}`}
                              onClick={() => setOpen(!open)}
                />
                {props.children}
            </div>
            <div className={`accordion_overflow ${open ? "extended" : ""}`}>
                {Array.from(props.itemIds).map((itemId, index) => {
                    const idx = items.findIndex((item) => item.id === itemId)
                    if (items[idx] === undefined) {
                        return null
                    }
                    return <span className={"accordion_overflow_list_item"}
                                 key={index}
                    >
                        {items[idx].name}
                        <FaTimes onClick={(e) => dispatchRobots({
                            type: 'removeItemId',
                            id: props.robotId,
                            value: itemId
                        })}/>
                    </span>
                })}
                {items.filter(item => !props.itemIds.includes(item.id)).length > 0
                    ? <FaPlus onClick={() => setModalState(!modalState)} />
                    : null
                }
                <Modal name={"Select items to add"}
                       open={modalState}
                       setOpen={(state: boolean) => setModalState(state)}
                >
                    <div className={"accordion_overflow_list"}>
                        {items.filter(item => !props.itemIds.includes(item.id))
                              .map((item, index) =>
                            <span className={"accordion_overflow_list_item accordion_overflow_list_item_modal"}
                                  key={index}
                                  onClick={() => dispatchRobots({
                                      type: 'addItemId',
                                      id: props.robotId,
                                      value: item.id
                                  })}
                            >
                                {item.name}
                            </span>
                        )}
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Accordion;