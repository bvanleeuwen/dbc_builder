import {useContext} from 'react';
import {ItemContext, ItemProvider} from "../context/ItemContext";
import {RobotContext, RobotProvider} from "../context/RobotContext";
import {DatabaseContext, DatabaseProvider} from "../context/DatabaseContext";
import AppContainer from "./AppContainer";
global.Buffer = global.Buffer || require('buffer').Buffer

const App = () => {

    const items = useContext(ItemContext)
    const robots = useContext(RobotContext)
    const database = useContext(DatabaseContext)

    return (
        <ItemProvider value={items}>
            <RobotProvider value={robots}>
                <DatabaseProvider value={database}>
                    <AppContainer />
                </DatabaseProvider>
            </RobotProvider>
        </ItemProvider>
    );
}

export default App;
