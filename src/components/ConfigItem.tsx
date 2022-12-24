import './Table.css';
import image from '../delete.png'

export interface IConfigEvents {
    handleNameUpdate: (id: number, name: string) => void
    handleValueUpdate: (id: number, value: string) => void
    handleDelete: (id: number) => void
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
                    onChange={(e) => row.handleNameUpdate(row.id, e.target.value)}
                />
                <input
                    className={"item_input"}
                    value={row.values[row.index]}
                    onChange={(e) => row.handleValueUpdate(row.id, e.target.value)}
                />
                <span
                    className={"item_delete"}
                    onClick={() => row.handleDelete(row.id)}
                >
                <img src={image} alt={"trashcan"} />
            </span>
        </form>
    )
}

export default Row;