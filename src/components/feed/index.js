import { useEffect, useState } from "react";
import Post from "./Post";
import FeedService from "@/services/FeedService";

const feedService = new FeedService();

export default function Feed({ userLogged }) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function func() {
      const { data } = await feedService.loadPosts();

      const postFormatted = data.map((post) => ({
        id: post._id,
        user: {
          id: post.userId,
          name: post.usuario.name,
          avatar: post.usuario.avatar,
        },
        image: post.image,
        description: post.description,
        likes: post.likes,
        comments: post.comments,
      }));

      setPostList(postFormatted);
    }

    func();
  }, [userLogged]);

  return (
    <>
      <div className="feedContainer width30pctDesktop">
        {postList.map((dataPost) => (
          <Post key={dataPost.id} {...dataPost} userLogged={userLogged} />
        ))}
      </div>
    </>
  );
}
