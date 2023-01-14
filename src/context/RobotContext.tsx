import {createContext, Dispatch, useReducer} from 'react';

export interface IRobotItem {
    id: number
    name: string
    itemIds: number[]
}
export const RobotContext = createContext<IRobotItem[]>([]);
export const RobotDispatchContext = createContext<Dispatch<IRobotContextAction>>(() => {});

export interface IRobotProvider {
    value: any
    children: any
}

export function RobotProvider({children}: IRobotProvider)  {
    const [items, dispatch] = useReducer(robotReducer,[]);

    return (
        <RobotContext.Provider value={items}>
            <RobotDispatchContext.Provider value={dispatch}>
                {children}
            </RobotDispatchContext.Provider>
        </RobotContext.Provider>
    );
}

export interface IRobotContextAction {
    type: string
    id?: number
    value?: any
}

function robotReducer(robots: IRobotItem[], action: IRobotContextAction) {
    switch (action.type) {
        case 'set': {
            return action.value;
        }
        case 'add': {
            return [...robots, {id: new Date().getTime(), name: "", itemIds: []}];
        }
        case 'updateName': {
            return robots.map(robot => {
                if (robot.id === action.id) {
                    robot.name = action.value;
                }
                return robot;
            });
        }
        case 'addItemId': {
            return robots.map(robot => {
                if (robot.id === action.id) {
                    if (!robot.itemIds.includes(action.value)) {
                        robot.itemIds.push(action.value)
                        robot.itemIds = robot.itemIds.sort()
                    }
                }
                return robot;
            });
        }
        case 'removeItemId': {
            return robots.map(robot => {
                if (robot.id === action.id) {
                    robot.itemIds = [...robot.itemIds.filter(itemId => itemId !== action.value)];
                }
                return robot;
            });
        }
        case 'delete': {
            return [...robots.filter(robot => robot.id !== action.id)];
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
