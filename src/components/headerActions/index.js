import Image from "next/image";

export default function HeaderAction({
    className, 
    iconLeft, 
    textLeft = null,
    handleClickLeft,
    title,
    rightElement,
    handleClickRight
    }){
    return(
        <div className={`${className} headerWithAction`}>
            {iconLeft ? (
                <Image
                    src={iconLeft}
                    alt="icone de voltar no cabeçalho"
                    onClick={handleClickLeft}
                    width={25}
                    height={25}
                />
            ):(
                textLeft !== null && (<span className="headerWithActionTextLeft" onClick={handleClickLeft}>{textLeft}</span>)
            )}
            <h3>{title}</h3>

            {
                rightElement && (
                    <button type="buton" className="btnRightElement" onClick={handleClickRight}>{rightElement}</button>
                )
            }
        </div>
    )
}