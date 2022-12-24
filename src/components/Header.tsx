import './Header.css';

interface IHeader {
    index: number
    setIndex: (index: number) => void
}

const Header = (header: IHeader) => {
    return (
        <div className="nav">
            {["Ontwikkeling", "Test", "Acceptatie", "Productie"].map((name, index) =>
                <div
                    className={`tab ${header.index === index ? "selected" : ""}`}
                    onClick={() => header.setIndex(index)}
                    key={index}
                >
                    <span>{name}</span>
                </div>
            )}
        </div>
    )
}




export default Header;
