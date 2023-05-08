import {useState} from "react"
import Image from "next/image";
import Link from "next/link";
import InputPublic from "../inputPublic";
import Button from "../button";
import emailIcon from "../../../public/images/email.svg"
import passIcon from "../../../public/images/key.svg"
import logo from "../../../public/images/logo.svg"
import {validateEmail,validatePass} from "../../utils/validators"

export default function Login() {

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const validateForm = () =>{
        return (
            validateEmail(email) && validatePass(password)
        );
    }

    return (
        <section className={`loginPage publicPage`}>
            <div className="logoContainer">
                <Image src={logo}
                    alt="Logotipo"
                    layout="fill"
                />
            </div>
            <div className="publicPageContent">
                <form>
                   <InputPublic 
                    image={emailIcon}
                    placeholder="E-mail"
                    type="email"
                    handleChange={e =>setEmail(e.target.value)}
                    value = {email}
                    message = "O e-mail informado é inválido."
                    showMessage = {email && !validateEmail(email)}
                   />
                   <InputPublic 
                    image={passIcon}
                    placeholder="Senha"
                    type="password"
                    handleChange={e =>setPassword(e.target.value)}
                    value = {password}
                    message = "A senha precisa ter pelo menos 3 caracteres."
                    showMessage = {password && !validatePass(password)}
                   />
                   <Button 
                    text="Login"
                    type="submit"
                    disabled={!validateForm()}
                   />
                </form>
                <div className="publicPageFooter">
                    <p>Não possui conta?</p>
                    <Link href="/create">Faça seu cadastro agora</Link>
                </div>
            </div>
        </section>
    )
}