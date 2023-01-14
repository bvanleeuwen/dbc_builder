import './ConfigItemList.css';
import ConfigItem from "./ConfigItem";
import {FaPlus} from "react-icons/fa";
import {useContext} from "react";
import {ItemContext, ItemDispatchContext} from "../context/ItemContext";

interface IConfigItemList {
    index: number
}

const ConfigItemList = ({index}: IConfigItemList) => {

    const items = useContext(ItemContext)
    const dispatchItems = useContext(ItemDispatchContext)

    return (
        <div className={"table"}>
            {items.map(({id, name, values}) =>
                <ConfigItem key={id}
                            id={id}
                            name={name}
                            values={values}
                            index={index}
                />
            )}
            <div className={"add_button"} onClick={() => dispatchItems({type: 'add'})}>
                <FaPlus />
            </div>
        </div>
    )
}

export default ConfigItemList;
