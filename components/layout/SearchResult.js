import Avatar from "../avatar";

export default function SearchResult({avatar, name, email,onClick,id}){
    return(
        <div className="searchResult" onClick={()=>onClick(id)}>
            <Avatar src={avatar}/>
            <div className="userInfo">
                <strong>{name}</strong>
                <span>{email}</span>
            </div>
        </div>
    )
}