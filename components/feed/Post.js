import Link from "next/link";
import Avatar from "../avatar";
import Image from "next/image";
import iconLike from "../../public/images/heart-outlined.svg";
import iconLiked from "../../public/images/heart-filled.svg";
import iconComment from "../../public/images/message-circle.svg";
import iconCommentActive from "../../public/images/message-circle-active.svg";
import { useState } from "react";
import { Comment } from "./Comment";
import FeedService from "../../services/FeedService";

const tamanhoLimiteDescricao = 90;
const feedService = new FeedService();

export default function Post({
  id,
  image,
  user,
  comments,
  description,
  userLogged,
  likes
}) {
  const [likesPost, setLikesPost] = useState(likes);
  const [commentsPost, setCommentPost] = useState(comments);
  const [showCommentContainer, setShowCommentContainer] = useState(false);
  const [tamanhoAtualDaDescricao, setTamanhoAtualDaDescricao] = useState(
    tamanhoLimiteDescricao
  );

  const exibirDescricaoCompleta = () => {
    setTamanhoAtualDaDescricao(Number.MAX_SAFE_INTEGER);
  };

  const descricaoMaiorQueLimite = () => {
    return description.length > tamanhoAtualDaDescricao;
  };

  const obterDescricao = () => {
    let mensagem = description.substring(0, tamanhoAtualDaDescricao);
    if (descricaoMaiorQueLimite()) {
      mensagem += "...";
    }

    return mensagem;
  };

  const getCommentIcon = () => {
    return showCommentContainer ? iconCommentActive : iconComment;
  };

  const toComment = async (newComment) => {
    try {
      await feedService.addComment(id, newComment);
      setShowCommentContainer(false);
      setCommentPost([
        ...commentsPost,{
            name: userLogged.name,
            comment: newComment
        }
      ])
    } catch (e) {
        alert(`Erro ao fazer comentário. ${(e?.response?.data?.error || "")}`);
        
    }
  };

  const handleLike = async () =>{
    try {
      await feedService.like(id);
      
      if(userLikedPost()){
        setLikesPost(
          likesPost.filter(userIdLiked => userIdLiked !== userLogged.id)
        )
      }else{
        setLikesPost([
          ...likesPost,
          userLogged.id
        ])
      }
    } catch (e) {
      alert(`Erro ao alterar curtida. ${(e?.response?.data?.error || "")}`);
    }
  }

  const userLikedPost = () => {
    return likesPost.includes(userLogged.id);
  }

  const getIconLike = () => {
    return userLikedPost() ? iconLiked : iconLike;
  };

  return (
    <>
      <div className="post">
        <Link href={`/profile/${user.id}`}>
          <section className="postHeader">
            <Avatar src={user.avatar} />
            <strong>{user.name}</strong>
          </section>
        </Link>
        <div className="postImage">
          <img src={image} alt="Foto da postagem"></img>
        </div>
        <div className="postFooter">
          <section className="postActions">
            <Image
              src={getIconLike()}
              alt="Icone da ação de curtir"
              width={20}
              height={20}
              onClick={handleLike}
            />
            <Image
              src={getCommentIcon()}
              alt="Icone da ação de comentário"
              width={20}
              height={20}
              onClick={() => setShowCommentContainer(!showCommentContainer)}
            />
            <span className="likesCount">
              Curtido por <strong>{likesPost.length} pessoas</strong>
            </span>
          </section>
          <section className="postDescription">
            <strong className="postUser">{user.name}</strong>
            <p className="description">
              {obterDescricao()}
              {descricaoMaiorQueLimite() && (
                <span
                  onClick={exibirDescricaoCompleta}
                  className="exibirDescricaoCompleta"
                >
                  mais
                </span>
              )}
            </p>
          </section>
          <section className="postComments">
            {commentsPost.map((c, i) => (
              <div className="comment" key={i}>
                <strong className="postUser">{c.name}</strong>
                <p className="description">{c.comment}</p>
              </div>
            ))}
          </section>
        </div>
        {showCommentContainer && (
          <Comment toComment={toComment} userLogged={userLogged} />
        )}
      </div>
    </>
  );
}
