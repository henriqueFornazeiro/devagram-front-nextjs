import HeaderAction from "../headerActions";
import iconChevronLeft from '../../../public/images/chevron-left.svg'
import Avatar from "../avatar";
import Button from "../button";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";

const userService = new UserService();

export default function HeaderProfile({
    userLogged,
    user
}){

    const [isFollowing, setIsFollowing] = useState();

    useEffect(()=>{
        if(!user){
            return;
        }
        setIsFollowing(user.followThisUser);
    },[user]);

    const getTextBtnFollow = () =>{
        
        if(isFollowing){
            return 'Deixar de seguir'
        }

        return 'Seguir';

    }

    const getColorBtnFollow = () =>{
        
        if(isFollowing){
            return 'primary-outline'
        }

        return 'primary';

    }

    const toggleBtnFollow = async() =>{
        
        try {
            await userService.toggleFollow(user._id);
            setIsFollowing(!isFollowing);
        } catch (error) {
            alert(`Erro ao seguir/deixar de seguir! (${error})`)
        }
    }

    return(
        <div className="headerProfile width30pctDesktop">
            <HeaderAction iconLeft={iconChevronLeft} title={user.name}/> 
            <hr className="headerProfileBorder"/>
            <div className="info">
                <Avatar src={user.avatar} />
                <div className="infoContainer">
                    <div className="infoNumbers">
                        <div className="infoStatus">
                            <strong>{user.publications}</strong>
                            <span>Publicações</span>
                        </div>
                        <div className="infoStatus">
                            <strong>{user.followers}</strong>
                            <span>Seguidores</span>
                        </div>
                        <div className="infoStatus infoFollowing">
                            <strong>{user.following}</strong>
                            <span>Seguindo</span>
                        </div>
                    </div>
                    <Button text={getTextBtnFollow()} color={getColorBtnFollow()} handleClick={toggleBtnFollow}/>
                </div>
            </div>
        </div>
    )
}