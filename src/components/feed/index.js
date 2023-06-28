import { useEffect, useState } from "react";
import Post from "./Post";
import FeedService from "@/services/FeedService";

const feedService = new FeedService();

export default function Feed({ userLogged, userProfile }) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function func() {
      const { data } = await feedService.loadPosts(userProfile?._id);
      
      const postFormatted = data.map((post) => ({
        id: post._id,
        user: {
          id: post.userId,
          name: post?.usuario?.name || userProfile?.name,
          avatar: post?.usuario?.avatar || userProfile?.avatar,
        },
        image: post.image,
        description: post.description,
        likes: post.likes,
        comments: post.comments,
      }));

      setPostList(postFormatted);
    }

    func();
  }, [userLogged, userProfile]);

  if(!postList.length){
    return null;
  }

  return (
    <>
      <div className="feedContainer width30pctDesktop">
        
        {postList.map((dataPost) => (
              <Post key={dataPost.id} {...dataPost} userLogged={userLogged} />
            ))
        }
      </div>
    </>
  );
}
