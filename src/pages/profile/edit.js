import HeaderAction from "@/components/headerActions";
import HeaderProfile from "@/components/headerProfile";
import UploadImagem from "@/components/uploadImage";
import withAuth from "@/hoc/withAuth";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import imgAvatarTemplate from "../../../public/images/avatar.svg"
import iconClear from "../../../public/images/x-circle.svg"
import Image from "next/image";

function EditProfile(){
    const [avatar, setAvatar] =  useState();
    const [inputAvatar, setInputAvatar] = useState(null);
    const [name, setName] = useState("");
    const router = useRouter();

    const handleClickCancel = () =>{
        router.push('/profile/me')
    }

    const openFileImg = () =>{
        console.log("abrir seletor de arquivos")
    }

    return (
        <div className="editProfilePage width30pctDesktop">
            <div className="editProfilePageContent">
                <HeaderAction 
                    title={'Editar Perfil'} 
                    textLeft={'Cancelar'}
                    handleClickLeft={handleClickCancel}
                    rightElement={'Concluir'}
                    handleClickRight={()=>console.log('clicou elemento direita')}
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
                        onClick={() => setName('')}
                    />
                </div>
                <hr className="divideBorder"/>

            </div>
        </div>
    )
}

export default withAuth(EditProfile);