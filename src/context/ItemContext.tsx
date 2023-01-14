import {createContext, Dispatch, useReducer} from 'react';

export interface IConfigItem {
    id: number
    name: string
    values: string[]
}

export const ItemContext = createContext<IConfigItem[]>([]);
export const ItemDispatchContext = createContext<Dispatch<IItemContextAction>>(() => {});

export interface IItemProvider {
    value: any
    children: any
}

export function ItemProvider({children}: IItemProvider)  {
    const [items, dispatch] = useReducer(itemReducer,[]);

    return (
        <ItemContext.Provider value={items}>
            <ItemDispatchContext.Provider value={dispatch}>
                {children}
            </ItemDispatchContext.Provider>
        </ItemContext.Provider>
    );
}

export interface IItemContextAction {
    type: string
    id?: number
    env?: number
    value?: any
}

function itemReducer(items: IConfigItem[], action: IItemContextAction) {
    switch (action.type) {
        case 'set': {
            return action.value;
        }
        case 'add': {
            return [...items, {id: new Date().getTime(), name: "", values: ["", "", "", ""]}];
        }
        case 'updateName': {
            return items.map(item => {
                if (item.id === action.id) {
                    item.name = action.value;
                }
                return item;
            });
        }
        case 'updateValue': {
            return items.map(item => {
                if (item.id === action.id) {
                    if (action.env !== undefined) {
                        item.values[action.env] = action.value;
                    }
                }
                return item;
            });
        }
        case 'duplicate': {
            return items.map(item => {
                if (item.id === action.id) {
                    if (action.env !== undefined) {
                        let val = item.values[action.env];
                        item.values.fill(val);
                    }
                }
                return item;
            });
        }
        case 'delete': {
            return [...items.filter(item => item.id !== action.id)];
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
