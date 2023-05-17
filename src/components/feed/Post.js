import Link from "next/link";
import Avatar from "../avatar";
import Image from "next/image";
import iconLike from "../../../public/images/heart-outlined.svg"
import iconLiked from "../../../public/images/heart-filled.svg"
import iconComment from "../../../public/images/message-circle.svg"

export default function Post({image, user,comments,description}){
    return(
        <>
        <div className="post">
            <Link href={`/profile/${user.id}`}>
                <section className="postHeader">
                    <Avatar src={user.avatar}/>
                    <strong>{user.name}</strong>
                </section>
            </Link>
            <div className="postImage">
                <img src={image} alt='Foto da postagem'>
                </img>
            </div>
            <div className="postFooter">
                <section className="postActions">
                    <Image
                        src={iconLike}
                        alt='Icone da ação de curtir'
                        width={20}
                        height={20}
                        onClick={()=>{console.log('curtir')}}
                    />
                    <Image
                        src={iconComment}
                        alt="Icone da ação de comentário"
                        width={20}
                        height={20}
                        onClick={()=>{console.log('comentar')}}
                    />
                    <span className="likesCount">
                        Curtido por <strong>10 pessoas</strong>
                    </span>
                </section>
                <section className="postDescription">
                    <strong className="postUser">{user.name}</strong>
                    <p className="description">
                        {description}
                    </p>
                </section>
                <section className="postComments">
                    {
                        comments.map((c, i) =>(
                            <div className="comment" key={i}>
                                <strong className="postUser">{c.name}</strong>
                                <p className="description">{c.comment}</p>
                            </div>
                        ))
                    }
                </section>
            </div>
        </div>
        </>
    )
}