import Header from "@/components/layout/Header";
import UserService from "@/services/UserService"
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
            
            return (
                <>
                    <Header/>
                    <Component {...props}/>
                </>              
            )
        }

        return null
    }
}