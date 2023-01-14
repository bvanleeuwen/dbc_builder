import {createContext, Dispatch, useReducer} from 'react';

export interface IDatabase {
    name: string
    table: string
}
export const DatabaseContext = createContext<IDatabase>({name: "", table: ""});
export const DatabaseDispatchContext = createContext<Dispatch<IDatabaseContextAction>>(() => {});

export interface IDatabaseProvider {
    value: any
    children: any
}

export function DatabaseProvider({children}: IDatabaseProvider)  {
    const [items, dispatch] = useReducer(databaseReducer,{name: "", table: ""});

    return (
        <DatabaseContext.Provider value={items}>
            <DatabaseDispatchContext.Provider value={dispatch}>
                {children}
            </DatabaseDispatchContext.Provider>
        </DatabaseContext.Provider>
    );
}

export interface IDatabaseContextAction {
    type: string
    value?: any
}

function databaseReducer(database: IDatabase[], action: IDatabaseContextAction) {
    switch (action.type) {
        case 'set': {
            return action.value;
        }
        case 'updateName': {
            return {...database,
                name: action.value
            };
        }
        case 'updateTable': {
            return {...database,
                table: action.value
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
