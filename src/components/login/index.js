import {useState} from "react"
import Image from "next/image";
import Link from "next/link";
import InputPublic from "../inputPublic";
import Button from "../button";
import emailIcon from "../../../public/images/email.svg"
import passIcon from "../../../public/images/key.svg"
import logo from "../../../public/images/logo.svg"

export default function Login() {

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

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
                   />
                   <InputPublic 
                    image={passIcon}
                    placeholder="Senha"
                    type="password"
                    handleChange={e =>setPassword(e.target.value)}
                    value = {password}
                   />
                   <Button 
                    text="Login"
                    type="submit"
                    disabled={false}
                   />
                </form>
                <div className="publicPageFooter">
                    <p>Não possui conta?</p>
                    <Link href="/cadastro">Faça seu cadastro agora</Link>
                </div>
            </div>
        </section>
    )
}