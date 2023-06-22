import HeaderAction from "../headerActions";
import iconChevronLeft from '../../../public/images/chevron-left.svg'
import Avatar from "../avatar";
import Button from "../button";

export default function HeaderProfile({
    userLogged,
    user
}){
    return(
        <div className="headerProfile width30pctDesktop">
            <HeaderAction iconLeft={iconChevronLeft} title={user.name}/> 
            <div className="info">
                <Avatar src={user.avatar} />
                <div className="infoContainer">
                    <div className="infoNumbers">
                        <div className="infoStatus">
                            <strong>15</strong>
                            <span>Publicações</span>
                        </div>
                        <div className="infoStatus">
                            <strong>123</strong>
                            <span>Seguidores</span>
                        </div>
                        <div className="infoStatus infoFollowing">
                            <strong>123</strong>
                            <span>Seguindo</span>
                        </div>
                    </div>
                    <Button text="Seguir"/>
                </div>
            </div>
        </div>
    )
}