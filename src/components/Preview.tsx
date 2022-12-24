import './Preview.css';
import {IConfigItem} from "./ConfigItem";
import {useRef} from "react";

export interface IDatabase {
    name: string
    table: string
}

interface IPreview {
    items: IConfigItem[]
    database: IDatabase
}

const Preview = ({items, database}: IPreview) => {

    const query_ref = useRef<HTMLElement>(null)
    const config_ref = useRef<HTMLElement>(null)

    return (
        <div className={"preview"}>
            <div className={"code_block"}>
                <div className={"code_block_header"}>
                    <span>QUERY</span>
                    <span
                        className={"code_block_button"}
                        onClick={() => navigator.clipboard.writeText(query_ref.current ? query_ref.current.innerText : "")}
                    >
                        Copy to Clipboard
                    </span>
                </div>
                <code ref={query_ref}>
                    {`>>Select TOP 1
                    ${items.map(({id, name, values}, index) =>
                        index < items.length - 1
                            ? `\n(SELECT value FROM dbo.${database.table} where parameter='${name}' AND omgeving = '<<+Input.Omgeving+>>') as ${name}`
                            : `\n(SELECT value FROM dbo.${database.table} where parameter='${name}' AND omgeving = '<<+Input.Omgeving+>>') as ${name},\n`
                    )}
                    FROM dbo.${database.table}<<`}
                </code>
            </div>
            <div className={"code_block"}>
                <div className={"code_block_header"}>
                    <span>CONFIG</span>
                    <span
                        className={"code_block_button"}
                        onClick={() => navigator.clipboard.writeText(config_ref.current ? config_ref.current.innerText : "")}
                    >
                        Copy to Clipboard
                    </span>
                </div>
                <code ref={config_ref}>
                    {`  USE [${database.name}];
                        GO;
                        
                        DROP TABLE dbo.${database.table};
                        
                        CREATE TABLE dbo.${database.table} (
                            omgeving NVARCHAR(255) NOT NULL,
                            parameter NVARCHAR(255) NOT NULL,
                            value NVARCHAR(max) NULL,
                            PRIMARY KEY (omgeving, parameter)
                        );
                        
                    `}
                    {["ONT", "TST", "ACC", "PRD"].map((env, index) =>
                        items.map(({name, values}) =>
                            `(INSERT INTO dbo.${database.table} VALUES ('${env}', '${name}', ${values[index]});\n`
                        )
                    )}
                    {`\nFROM dbo.${database.table}`}
                </code>
            </div>
        </div>
    );
}

export default Preview;
