import {useEffect, useState} from 'react';
import './App.css';
import Header from "./Header";
import Table from "./Table";
import {IConfigItem} from "./ConfigItem";
import Preview, {IDatabase} from "./Preview";
global.Buffer = global.Buffer || require('buffer').Buffer

const App = () => {

    const [index, setIndex] = useState(0)
    const [items, setItems] = useState<IConfigItem[]>([
        {
            id: 1,
            name: "mc_url",
            values: ["mc_url1", "mc_url2", "mc_url3", "mc_url4"]
        },
        {
            id: 2,
            name: "graph_url",
            values: ["graph_url1", "graph_url2", "graph_url3", "graph_url4"]
        },
        {
            id: 3,
            name: "other_url",
            values: ["other_url1", "other_url2", "other_url3", "other_url4"]
        },
    ])
    const [database, setDatabase] = useState<IDatabase>({name: "KofaxRPA-KBS-ONT", table: "DIS_Config"})
    const [binary, setBinary] = useState("")

    useEffect(() => {
        const bin = Buffer.from(JSON.stringify(items)).toString("base64");
        setBinary(bin)
    }, [items])

    function handlePasteBinary(hash: string) {
        const str = JSON.parse(Buffer.from(hash, "base64").toString())
        setItems(str)
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
