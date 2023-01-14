import './Modal.css';
import {useEffect} from "react";

interface IModal {
    name: string
    open: boolean
    setOpen: (state: boolean) => void
    children: any
}

const Modal = ({name, open, setOpen, children}: IModal) => {

    // https://stackoverflow.com/questions/61740073/how-to-detect-keydown-anywhere-on-page-in-a-react-app
    useEffect(() => {
        function handleKeyUp(e: KeyboardEvent) {
            if (open && e.key === "Escape") {
                setOpen(false)
            }
        }

        document.addEventListener('keyup', handleKeyUp);

        // Don't forget to clean up
        return function cleanup() {
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [open]);

    return (
        <div className={"modal_container"}
             style={{display: open ? "flex" : "none"}}
             onClick={() => setOpen(false)}
        >
            <div className={"modal_wrapper"}>
                <div className={"modal"}
                     onClick={e => e.stopPropagation()}
                >
                    <div className={"modal_header"}>
                        <span>{name}</span>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}




export default Modal;
