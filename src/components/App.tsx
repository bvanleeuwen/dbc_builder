import {useEffect, useState} from 'react';
import './App.css';
import Header from "./Header";
import Table from "./Table";
import {IConfigItem} from "./ConfigItem";
import Preview, {IDatabase} from "./Preview";
global.Buffer = global.Buffer || require('buffer').Buffer

const App = () => {

    const [index, setIndex] = useState(0)
    const [items, setItems] = useState<IConfigItem[]>([])
    const [database, setDatabase] = useState<IDatabase>({name: "", table: ""})
    const [binary, setBinary] = useState("")

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        const json = {
            items: items,
            database: database
        }
        const bin = Buffer.from(JSON.stringify(json)).toString("base64");
        setBinary(bin)
    }, [items, database])

    function handlePasteBinary(hash: string) {
        const json = JSON.parse(Buffer.from(hash, "base64").toString())
        setDatabase(json.database)
        setItems(json.items)
    }

    return (
        <div className={"App"}>
            <div className={"body"}>
                <Preview items={items} database={database} />

                <div className={"container"}>
                    <Header index={index} setIndex={(index) => setIndex(index)}/>
                    <Table items={items} setItems={setItems} index={index}/>
                    <div className={"inputs"}>
                        <div className={"wrapper"}>
                            <span className={"input_name"}>Database</span>
                            <span className={"input_name"}>Table</span>
                            <span className={"input_name"}>Hashcode</span>
                        </div>
                        <form className={"wrapper"}>
                            <input
                                className={"input_value"}
                                value={database.name}
                                placeholder={"Database"}
                                onChange={(e) => setDatabase({...database, name: e.target.value})}
                            />
                            <input
                                className={"input_value"}
                                value={database.table}
                                placeholder={"Table"}
                                onChange={(e) => setDatabase({...database, table: e.target.value})}
                            />
                            <input
                                className={"input_value"}
                                value={binary}
                                placeholder={"Hashcode"}
                                onChange={e => handlePasteBinary(e.target.value)}
                            />
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;
