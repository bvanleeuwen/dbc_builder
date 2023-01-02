import './Table.css';
    import { FaFill, FaTrash } from 'react-icons/fa';


export interface IConfigEvents {
    handleNameUpdate: (id: number, name: string) => void
    handleValueUpdate: (id: number, value: string) => void
    handleDelete: (id: number) => void
    handleDuplicate: (id: number, index: number) => void
    index: number
}

export interface IConfigItem {
    id: number
    name: string
    values: string[]
}

const Row = (row : IConfigItem & IConfigEvents) => {

    return (
        <form className={"item"}>
            <input
                className={"item_input"}
                value={row.name}
                placeholder={"Name"}
                onChange={(e) => row.handleNameUpdate(row.id, e.target.value)}
            />
            <input
                className={"item_input"}
                value={row.values[row.index]}
                placeholder={"Value"}
                onChange={(e) => row.handleValueUpdate(row.id, e.target.value)}
            />
            <FaFill
                className={"item_button item_button_duplicate"}
                onClick={() => row.handleDuplicate(row.id, row.index)}
            />
            <FaTrash
                className={"item_button item_delete"}
                onClick={() => row.handleDelete(row.id)}
            />
        </form>
    )
}

export default Row;