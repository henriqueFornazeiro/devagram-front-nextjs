import HeaderAction from "../headerActions";
import iconChevronLeft from '../../../public/images/chevron-left.svg'
import Avatar from "../avatar";
import Button from "../button";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";
import { useRouter } from "next/router";

const userService = new UserService();

export default function HeaderProfile({
    userLogged,
    user,
    isProfileUserLogged
}){

    const [isFollowing, setIsFollowing] = useState();
    const [qtyFollowers, setQtyFollowers] =  useState(0);

    const router = useRouter();

    useEffect(()=>{
        if(!user){
            return;
        }
        setIsFollowing(user.followThisUser);
        setQtyFollowers(user.followers);
    },[user]);

    const getTextBtnMain = () =>{
        
        if(isProfileUserLogged){
            return "Editar perfil";
        }

        if(isFollowing){
            return 'Deixar de seguir';
        }

        return 'Seguir';

    }

    const getColorBtnMain = () =>{
        
        if(isFollowing || isProfileUserLogged){
            return 'primary-outline'
        }

        return 'primary';

    }

    const toggleBtnMain = async() =>{
        if(isProfileUserLogged){
            return router.push('/profile/edit');
        }
        
        try {
            await userService.toggleFollow(user._id);
            setQtyFollowers(
                isFollowing 
                    ? (qtyFollowers - 1) 
                    : (qtyFollowers + 1)
            )
            setIsFollowing(!isFollowing);
            
        } catch (error) {
            alert(`Erro ao seguir/deixar de seguir! (${error})`)
        }
    }

    const handleClickLeft = () =>{
        router.back();
    }

    return(
        <div className="headerProfile width30pctDesktop">
            < HeaderAction iconLeft={isProfileUserLogged ? null : iconChevronLeft} title={user.name} handleClick={handleClickLeft}/> 
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
                            <strong>{qtyFollowers}</strong>
                            <span>Seguidores</span>
                        </div>
                        <div className="infoStatus infoFollowing">
                            <strong>{user.following}</strong>
                            <span>Seguindo</span>
                        </div>
                    </div>
                    <Button text={getTextBtnMain()} color={getColorBtnMain()} handleClick={toggleBtnMain}/>
                </div>
            </div>
        </div>
    )
}