import './Table.css';
import ConfigItem, {IConfigItem} from "./ConfigItem";

interface ITable {
    items: IConfigItem[]
    setItems: (items: IConfigItem[]) => void
    index: number
}

const Table = ({items, setItems, index}: ITable) => {

    const handleNameUpdate = (id: number, name: string) => {
        setItems(
            items.map(item => {
                if (item.id === id) {
                    item.name = name;
                }
                return item;
            }),
        );
    };

    const handleValueUpdate = (id: number, value: string) => {
        setItems(
            items.map(item => {
                if (item.id === id) {
                    item.values[index] = value;
                }
                return item;
            }),
        );
    };

    const handleDelete = (id: number) => {
        setItems([...items.filter(item => item.id !== id)]);
    }

    const handleAddItem = () => {
        setItems([...items, {id: new Date().getTime(), name: "", values: ["", "", "", ""]}]);
    }

    const handleDuplicate = (id: number, index: number) => {
        setItems(
            items.map(item => {
                if (item.id === id) {
                    let val = item.values[index];
                    item.values.fill(val);
                }
                return item;
            }),
        );
    }

    return (
        <div className={"table"}>
            {items.map(({id, name, values}) =>
                <ConfigItem
                    id={id}
                    name={name}
                    values={values}
                    index={index}
                    handleNameUpdate={handleNameUpdate}
                    handleValueUpdate={handleValueUpdate}
                    handleDelete={handleDelete}
                    handleDuplicate={handleDuplicate}
                    key={id}
                />
            )}
            <div className={"item add"} onClick={handleAddItem}>+</div>
        </div>
    )
}

export default Table;
