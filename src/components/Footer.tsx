import './Footer.css';
import {FaCopy, FaEye, FaFileImport} from "react-icons/fa";
import {useContext, useState} from "react";
import {DatabaseContext, DatabaseDispatchContext} from "../context/DatabaseContext";
import Modal from "./Modal";
import {ItemContext} from "../context/ItemContext";

export interface IFooter {
    binary: string
    setBinary: (binary: string) => void
}

const Footer = (props: IFooter) => {

    const items = useContext(ItemContext)
    const database = useContext(DatabaseContext)
    const dispatchDatabase = useContext(DatabaseDispatchContext)

    const [modalConfigState, setModalConfigState] = useState<boolean>(false)

    let modalcontentConfig =
        `  USE [${database.name}];
                        
            DROP TABLE dbo.${database.table};
            
            CREATE TABLE dbo.${database.table} (
                omgeving nvarchar(4) NOT NULL,
                parameter nvarchar(max) NOT NULL,
                value nvarchar(max) NOT NULL,
                PRIMARY KEY (omgeving, parameter)
            );


    ${["ONT", "TST", "ACC", "PRD"].map((env, index) =>
            items.map(({name, values}) =>
                // check if at least one value is non-empty and if the name is not empty
                values.some(Boolean) && name.length !== 0
                    ? `INSERT INTO dbo.${database.table} VALUES ('${env}', '${name}', '${values[index]}');\n`
                    : null
            ).join('')
        ).join('')}`

    return (
        <div className={"inputs"}>
            <div className={"footer_input_container"}>
                <span className={"footer_header_text"}>Database</span>
                <input className={"footer_input"}
                       value={database.name}
                       placeholder={"Database"}
                       onChange={(e) => dispatchDatabase({
                           type: 'updateName',
                           value: e.target.value
                       })}
                />
            </div>
            <div className={"footer_input_container"}>
                <span className={"footer_header_text"}>Table</span>
                <input className={"footer_input"}
                       value={database.table}
                       placeholder={"Table"}
                       onChange={(e) => dispatchDatabase({
                           type: 'updateTable',
                           value: e.target.value
                       })}
                />
            </div>

            <div className={"footer_output_container"}>
                <div className={"footer_output_wrapper"}>
                    <span className={"footer_header_text"}>Config</span>
                    <FaEye className={"default_button show_code_button"}
                           onClick={() => setModalConfigState(true)}
                    />
                    <FaCopy className={"default_button copy_button"}
                            onClick={() => navigator.clipboard.writeText(modalcontentConfig)}
                    />
                    <Modal name={"config"}
                           open={modalConfigState}
                           setOpen={(state: boolean) => setModalConfigState(state)}
                    >
                        <code>{modalcontentConfig}</code>
                    </Modal>
                </div>

                <div className={"footer_output_wrapper"}>
                    <span className={"footer_header_text"}>Share code</span>
                    <FaFileImport className={"default_button paste_button"}
                                  onClick={() => navigator.clipboard.readText()
                                      .then((text) => props.setBinary(text))}
                    />
                    <FaCopy className={"default_button copy_button"}
                            onClick={() => navigator.clipboard.writeText(props.binary)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Footer;
