import './Preview.css';
import {IConfigItem} from "./ConfigItem";
import {useRef} from "react";
import {FaCopy} from "react-icons/fa";

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
                    <FaCopy
                        className={"code_block_button"}
                        onClick={() => navigator.clipboard.writeText(query_ref.current ? query_ref.current.innerText : "")}
                    />
                </div>
                <code ref={query_ref}>
                    {`>>SELECT TOP 1\n`}
                    {items.map(({name, values}, index) =>
                        // check if at least one value is non-empty and if the name is not empty
                        values.some(Boolean) && name.length !== 0
                            // last element should not end with a comma
                            ? index < items.length - 1
                                ? `\n(SELECT value FROM dbo.${database.table} WHERE parameter='${name}' AND omgeving='<<+Input.Omgeving+>>') AS ${name},`
                                : `\n(SELECT value FROM dbo.${database.table} WHERE parameter='${name}' AND omgeving='<<+Input.Omgeving+>>') AS ${name}`
                            : null
                    )}
                    {`\n\nFROM dbo.${database.table}<<`}
                </code>
            </div>
            <div className={"code_block"}>
                <div className={"code_block_header"}>
                    <span>CONFIG</span>
                    <FaCopy
                        className={"code_block_button"}
                        onClick={() => navigator.clipboard.writeText(config_ref.current ? config_ref.current.innerText : "")}
                    />
                </div>
                <code ref={config_ref}>
                    {`  USE [${database.name}];
                        
                        DROP TABLE dbo.${database.table};
                        
                        CREATE TABLE dbo.${database.table} (
                            omgeving nvarchar(4) NOT NULL,
                            parameter nvarchar(max) NOT NULL,
                            value nvarchar(max) NOT NULL,
                            PRIMARY KEY (omgeving, parameter)
                        );

                    `}
                    {["ONT", "TST", "ACC", "PRD"].map((env, index) =>
                        items.map(({name, values}) =>
                            // check if at least one value is non-empty and if the name is not empty
                            values.some(Boolean) && name.length !== 0
                                ? `INSERT INTO dbo.${database.table} VALUES ('${env}', '${name}', '${values[index]}');\n`
                                : null
                        )
                    )}
                </code>
            </div>
        </div>
    );
}

export default Preview;
