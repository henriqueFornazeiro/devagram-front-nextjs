import HeaderAction from "@/components/headerActions";
import HeaderProfile from "@/components/headerProfile";
import UploadImagem from "@/components/uploadImage";
import withAuth from "@/hoc/withAuth";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import imgAvatarTemplate from "../../../public/images/avatar.svg"
import iconClear from "../../../public/images/x-circle.svg"
import Image from "next/image";
import UserService from "@/services/UserService";
import { validateName } from "@/utils/validators";

const userService = new UserService();

function EditProfile({userLogged}){
    const [avatar, setAvatar] =  useState();
    const [inputAvatar, setInputAvatar] = useState(null);
    const [name, setName] = useState("");
    const router = useRouter();

    useEffect(()=>{
        if(!userLogged){
            return;
        }
        setName(userLogged.name);
        setAvatar({preview: userLogged.avatar})
    },[]);

    const handleClickCancel = () =>{
        router.push('/profile/me')
    }

    const openFileImg = () =>{
        inputAvatar?.click();
    }

    const updateProfile = async () =>{
        try {
            if(!validateName(name)){
                alert("Nome precisa de pelo menos dois caracteres");
                return;
            }
            
            const payload = new FormData();
            payload.append('name',name);

            if(avatar.arquivo){
                payload.append('file',avatar.arquivo)
            }

            await userService.updateUser(payload);
            localStorage.setItem('name', name);

            if(avatar.arquivo){
                localStorage.setItem('avatar', avatar.preview);
            }

            router.push('/profile/me')

        } catch (error) {
            alert(`Erro ao editar perfil!`)
        }
    }

    return (
        <div className="editProfilePage width30pctDesktop">
            <div className="editProfilePageContent">
                <HeaderAction 
                    title={'Editar Perfil'} 
                    textLeft={'Cancelar'}
                    handleClickLeft={handleClickCancel}
                    rightElement={'Concluir'}
                    handleClickRight={updateProfile}
                />
                <hr className="divideBorder"/>

                <div className="editAvatar">
                    <UploadImagem 
                        setImagem={setAvatar}
                        imagePreview={avatar?.preview || imgAvatarTemplate.src}
                        aoSetarAReferencia={setInputAvatar}
                        imagemPreviewClassName="avatar"
                    />

                    <span onClick={openFileImg}>
                        Alterar foto do perfil
                    </span>
                </div>

                <hr className="divideBorder"/>

                <div className="inputEditName">
                    <label>Nome</label>
                    <input type="text" Value={name} onChange={e => setName(e.target.value)}/>
                    <Image
                        src={iconClear}
                        alt="icone de limpar o nome"
                        width={18}
                        height={18}
                        onClick={() => setName("")}
                    />
                </div>
                <hr className="divideBorder"/>

            </div>
        </div>
    )
}

export default withAuth(EditProfile);