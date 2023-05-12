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
import {
  validateEmail,
  validatePass,
  validateName,
  validateConfirmPass,
} from "../../utils/validators";
import UserService from "@/services/UserService";

const userService = new UserService();

export default function Create() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const validateForm = () => {
    return (
      validateEmail(email) &&
      validatePass(password) &&
      validateName(name) &&
      validateConfirmPass(password, confirmPassword)
    );
  };

  const onSubmitForm = async (e) => {
    
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmited(true);

    try {
      const bodyReqCreate = new FormData();
      bodyReqCreate.append("name", name);
      bodyReqCreate.append("email", email);
      bodyReqCreate.append("password", password);

      if (image?.arquivo) {        
        bodyReqCreate.append("file", image.arquivo);
      }

      await userService.create(bodyReqCreate);

      alert("Sucesso! Usuário criado");

    } catch (e) {
      alert("Não foi possível cadastrar o usuário: " + e?.response?.data?.error);
    }

    setIsSubmited(false);
  };

  return (
    <section className={`createPage publicPage`}>
      <div className="logoContainer desktop">
        <Image src={logo} alt="Logotipo" layout="fill" />
      </div>
      <div className="publicPageContent">
        <form onSubmit={onSubmitForm}>
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
            message="O nome precisa ter mais de 2 caracteres."
            showMessage={name && !validateName(name)}
          />
          <InputPublic
            image={emailIcon}
            placeholder="E-mail"
            type="email"
            handleChange={(e) => setEmail(e.target.value)}
            value={email}
            message="O e-mail informado é inválido."
            showMessage={email && !validateEmail(email)}
          />
          <InputPublic
            image={passIcon}
            placeholder="Senha"
            type="password"
            handleChange={(e) => setPassword(e.target.value)}
            value={password}
            message="A senha precisa ter mais de 3 caracteres."
            showMessage={password && !validatePass(password)}
          />
          <InputPublic
            image={passIcon}
            placeholder="Confirmar Senha"
            type="password"
            handleChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            message="As senhas não conferem."
            showMessage={
              confirmPassword && !validateConfirmPass(password, confirmPassword)
            }
          />
          <Button
            text="Cadastrar"
            type="submit"
            disabled={!validateForm() || isSubmited}
          />
        </form>
        <div className="publicPageFooter">
          <p>Já possui conta?</p>
          <Link href="/">Faça seu login aqui</Link>
        </div>
      </div>
    </section>
  );
}
