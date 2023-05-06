import Image from "next/image";

export default function InputPublic({
    image,
    type,
    placeholder,
    value="",
    showMessage = false,
    message = "",
    handleChange
    }){
    return(
        <div className="inputPublicContainer">
            <div className="inputPublic">
                <Image
                    src={image}
                    alt="input icon"
                    className="inputPublicIcon"
                    width={20}
                    height={20}
                    className="logo"
                />
                <input 
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
            </div>
            {showMessage && <p className="validationMessage">{message}</p>}
        </div>
    )
}