import Image from "next/image";

export default function HeaderAction({
    className, 
    iconLeft, 
    textLeft = null,
    handleClick,
    title,
    rightElement
    }){
    return(
        <div className={`${className} headerWithAction`}>
            {iconLeft ? (
                <Image
                    src={iconLeft}
                    alt="icone de voltar no cabeçalho"
                    onClick={handleClick}
                    width={25}
                    height={25}
                />
            ):(
                textLeft !== null && (<span className="headerWithActionTextLeft" onClick={handleClick}>{textLeft}</span>)
            )}
            <h3>{title}</h3>

            {
                rightElement && (
                    <button type="buton">{rightElement}</button>
                )
            }
        </div>
    )
}