import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Loading from "../components/loading";
import UserService from "../services/UserService"
import { useRouter } from "next/router";

const userService = new UserService();

export default function withAuth(Component){
    return(props)=>{
        if(typeof window !== 'undefined'){
            const router = useRouter();
            if(!userService.isAuthenticated()){
                router.replace("/");
                return null
            }

            const userLoggedInfo = userService.getUserLoggedInfo();
            
            return (
                <>
                    <Header userLogged={userLoggedInfo}/>
                    <Loading/>
                    <Component userLogged={userLoggedInfo} {...props}/>
                    <Footer userLogged={userLoggedInfo}/>
                </>              
            )
        }

        return null
    }
}