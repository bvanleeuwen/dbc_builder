import {useEffect, useRef, useState} from 'react';
import './App.css';
import Header from "./Header";
import Table from "./Table";
import {IConfigItem} from "./ConfigItem";
import Preview, {IDatabase} from "./Preview";
import {FaCopy} from "react-icons/fa";
global.Buffer = global.Buffer || require('buffer').Buffer

const App = () => {

    const [index, setIndex] = useState(0)
    const [items, setItems] = useState<IConfigItem[]>([])
    const [database, setDatabase] = useState<IDatabase>({name: "", table: ""})
    const [binary, setBinary] = useState(() => {
        const hash = localStorage.getItem("hashcode") || ""
        handlePasteBinary(hash)
        return hash
    })
    const sharecode_ref = useRef<HTMLInputElement>(null)

    // update the hash code on item or database change
    useEffect(() => {
        const json = {
            items: items,
            database: database
        }
        const bin = Buffer.from(JSON.stringify(json)).toString("base64")
        setBinary(bin)
        localStorage.setItem("hashcode", bin)
    }, [items, database])

    // handler for custom hash code input
    function handlePasteBinary(hash: string) {
        const str = Buffer.from(hash, "base64").toString()
        if (str.length === 0) {
            return
        }
        const json = JSON.parse(str)
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
                            <input
                                className={"input_value"}
                                value={database.name}
                                placeholder={"Database"}
                                onChange={(e) => setDatabase({...database, name: e.target.value})}
                            />
                        </div>
                        <div className={"wrapper"}>
                            <span className={"input_name"}>Table</span>
                            <input
                                className={"input_value"}
                                value={database.table}
                                placeholder={"Table"}
                                onChange={(e) => setDatabase({...database, table: e.target.value})}
                            />
                        </div>
                        <div className={"wrapper"}>
                            <span className={"input_name"}>Share code</span>
                            <div className={"share_code_wrapper"}>
                                <input
                                    className={"input_value"}
                                    value={binary}
                                    placeholder={"Share code"}
                                    onChange={e => handlePasteBinary(e.target.value)}
                                    ref={sharecode_ref}
                                />
                                <FaCopy
                                    className={"share_code_button"}
                                    onClick={() => navigator.clipboard.writeText(sharecode_ref.current ? sharecode_ref.current.value : "")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
