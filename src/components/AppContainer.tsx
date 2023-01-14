import {useContext, useEffect, useState} from 'react';
import './AppContainer.css';
import Header from "./Header";
import RobotItemList from "./RobotItemList";
import ConfigItemList from "./ConfigItemList";
import Footer from "./Footer";
import {ItemContext, ItemDispatchContext} from "../context/ItemContext";
import {RobotContext, RobotDispatchContext} from "../context/RobotContext";
import {DatabaseContext, DatabaseDispatchContext} from "../context/DatabaseContext";

const AppContainer = () => {

    const [index, setIndex] = useState(0)
    const items = useContext(ItemContext)
    const dispatchItems = useContext(ItemDispatchContext)

    const robots = useContext(RobotContext)
    const dispatchRobots = useContext(RobotDispatchContext)

    const database = useContext(DatabaseContext)
    const dispatchDatabase = useContext(DatabaseDispatchContext)

    const [binary, setBinary] = useState<string>(localStorage.getItem("hashcode") || "")

    // get the JSON back from the hash and dispatch setters for the item, database, and robot
    function handlePasteBinary(hash: string) {
        const str = Buffer.from(hash, "base64").toString()
        if (str.length === 0) {
            return
        }
        const json = JSON.parse(str)
        if (!json.items || !json.database || !json.robots) {
            return
        }
        dispatchItems({
            type: 'set',
            value: json.items
        })
        dispatchDatabase({
            type: 'set',
            value: json.database
        })
        dispatchRobots({
            type: 'set',
            value: json.robots
        })
    }

    // update the hash code on item, database, or robot change
    useEffect(() => {
        const json = {
            items: items,
            database: database,
            robots: robots
        }
        const hash = Buffer.from(JSON.stringify(json)).toString("base64")
        localStorage.setItem("hashcode", hash)
        setBinary(hash)
    }, [items, database, robots])

    // update the item, database, and robot after the component has loaded
    useEffect(() => {
        handlePasteBinary(binary)
    }, [])

    return (
        <div className={"App"}>
            <div className={"body"}>
                <RobotItemList />
                <div className={"container"}>
                    <Header index={index} setIndex={(index) => setIndex(index)}/>
                    <ConfigItemList index={index} />
                </div>
            </div>
            <Footer binary={binary} setBinary={handlePasteBinary}/>
        </div>
    );
}

export default AppContainer;
