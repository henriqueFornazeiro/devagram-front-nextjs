import { useEffect, useState } from "react"
import Post from "./Post";

export default function Feed({userLogged}){
    const [postList, setPostList] = useState([]);

    useEffect(()=>{
        console.log("carregar feed");
        setPostList([
            {
                id:'2',
                user:{
                    id:'1',
                    name:'Joao',
                    avatar:null
                },
                image: 'https://cdn.cosmicjs.com/2bb0e740-f4c2-11ed-bb44-790a83f99a24-122391577_1517615238429459_2934071392890602250_n.jpg',
                description:'It is a long established fact that a reader will be distracted by the readable content',
                likes:[],
                comments:[
                    {
                        name:'Fulano',
                        comment:'Muito legal'
                    },
                    {
                        name:'Ciclano',
                        comment:'Muito legal'
                    },
                    {
                        name:'Fulano de Tal',
                        comment:'Muito legal'
                    }
                ]
            },
            {
                id:'2',
                user:{
                    id:'2',
                    name:'Fulano',
                    avatar:null
                },
                image: 'https://cdn.cosmicjs.com/2bb0e740-f4c2-11ed-bb44-790a83f99a24-122391577_1517615238429459_2934071392890602250_n.jpg',
                description:'It is a long established fact that a reader will be distracted by the readable content',
                likes:[],
                comments:[
                    {
                        name:'João',
                        comment:'Muito legal'
                    }
                ]
            }
        ])
    },[userLogged])


    return (
        <>
            <div className="feedContainer width30pctDesktop">
                {postList.map(dataPost => (
                    <Post key={dataPost.id} {...dataPost}/>
                ))}
            </div>
        </>
    )
}