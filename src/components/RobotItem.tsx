import './RobotItem.css';
import {FaCopy, FaEye, FaTrash} from 'react-icons/fa';
import Modal from "./Modal";
import {useContext, useEffect, useState} from "react";
import {IRobotItem, RobotDispatchContext} from "../context/RobotContext";

export interface IRobotEvents {
    getQueryContent: (indices: number[]) => string
}

const RobotItem = (robot : IRobotItem & IRobotEvents) => {

    const dispatchRobots = useContext(RobotDispatchContext)

    const [modalState, setModalState] = useState<boolean>(false)
    const [content, setContent] = useState<string>("")

    useEffect(() => {
        setContent(robot.getQueryContent(robot.itemIds))
    }, [robot])

    return (
        <div className={"robot"} key={robot.id}>
            <input className={"item_input"}
                   value={robot.name}
                   placeholder={"Name"}
                   onChange={(e) => dispatchRobots({
                       type: 'updateName',
                       id: robot.id,
                       value: e.target.value
                   })}
            />
            <FaEye className={"default_button show_code_button"}
                   onClick={() => setModalState(true)}
            />
            <FaCopy className={"default_button copy_button"}
                    onClick={() => navigator.clipboard.writeText(content)}
            />
            <FaTrash className={"default_button delete_button"}
                     onClick={() => dispatchRobots({
                         type: 'delete',
                         id: robot.id
                     })}
            />
            <Modal name={robot.name}
                   open={modalState}
                   setOpen={(state: boolean) => setModalState(state)}
            >
                <code>{content}</code>
            </Modal>
        </div>
    )
}

export default RobotItem;