import './ConfigItem.css';
import { FaFill, FaTrash } from 'react-icons/fa';
import {useContext} from "react";
import {IConfigItem, ItemDispatchContext} from "../context/ItemContext";

export interface IConfigEvents {
    index: number
}

const Row = (row : IConfigItem & IConfigEvents) => {

    const dispatch = useContext(ItemDispatchContext)

    return (
        <form className={"item"}>
            <input
                className={"item_input"}
                value={row.name}
                placeholder={"Name"}
                onChange={(e) => dispatch({
                    type: 'updateName',
                    id: row.id,
                    env: row.index,
                    value: e.target.value
                })}
            />
            <input
                className={"item_input"}
                value={row.values[row.index]}
                placeholder={"Value"}
                onChange={(e) => dispatch({
                    type: 'updateValue',
                    id: row.id,
                    env: row.index,
                    value: e.target.value
                })}
            />
            <FaFill
                className={"default_button duplicate_button"}
                onClick={() => dispatch({
                    type: 'duplicate',
                    id: row.id,
                    env: row.index
                })}
            />
            <FaTrash
                className={"default_button delete_button"}
                onClick={() => dispatch({
                    type: 'delete',
                    id: row.id
                })}
            />
        </form>
    )
}

export default Row;