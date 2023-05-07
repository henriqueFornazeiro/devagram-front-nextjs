import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import emailIcon from "../../../public/images/email.svg";
import passIcon from "../../../public/images/key.svg";
import userIcon from "../../../public/images/user.svg";
import logo from "../../../public/images/logo.svg";
import avatar from "../../../public/images/avatar.svg";
import Button from "@/components/button";
import InputPublic from "@/components/inputPublic";
import UploadImage from "@/components/uploadImage";

export default function Create() {

    const [image, setImage]=useState(null);
    const [name, setName]=useState("");    
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");

  return (
    <section className={`createPage publicPage`}>
      <div className="logoContainer desktop">
        <Image src={logo} alt="Logotipo" layout="fill" />
      </div>
      <div className="publicPageContent">
        <form>
          
          <UploadImage
            imagemPreviewClassName="avatar avatarPreview"
            imagePreview={image?.preview || avatar.src}
            setImagem={setImage}
          />
          <InputPublic
            image={userIcon}
            placeholder="Nome completo"
            type="text"
            handleChange={(e) => setName(e.target.value)}
            value={name}
          />
          <InputPublic
            image={emailIcon}
            placeholder="E-mail"
            type="email"
            handleChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <InputPublic
            image={passIcon}
            placeholder="Senha"
            type="password"
            handleChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputPublic
            image={passIcon}
            placeholder="Confirmar Senha"
            type="password"
            handleChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <Button text="Cadastrar" type="submit" disabled={false} />
        </form>
        <div className="publicPageFooter">
          <p>Já possui conta?</p>
          <Link href="/">Faça seu login aqui</Link>
        </div>
      </div>
    </section>
  );
}
