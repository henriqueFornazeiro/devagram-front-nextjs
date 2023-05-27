import { useState } from "react";
import Avatar from "../avatar";

export function Comment({ userLogged, toComment }) {
  const [rows, setRows] = useState(1);

  const [comment, setComment] = useState("");

  const handleTextareaComment = (e) => {
    const valueText = e.target.value;

    setComment(valueText);

    setRows(valueText.length > 0 ? 2 : 1);
  };

  const pressingKey = (e) => {
    if (e.key === "Enter") {
      handleComment();
    }
  };

  const handleComment = () => {
    if (comment.trim().length === 0 || !toComment) return;

    toComment(comment);

  };

  return (
    <div className="commentContainer">
      <Avatar src={userLogged.avatar} />
      <textarea
        rows={rows}
        onChange={handleTextareaComment}
        onKeyDown={pressingKey}
        value={comment}
        placeholder="Adicione um comentario..."
      ></textarea>

      <button
        type="button"
        className="btnPublish desktop"
        // onClick={fazerComentario}
      >
        Publicar
      </button>
    </div>
  );
}
