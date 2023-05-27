
import Avatar from "../avatar";

export function Comment({ userLogged}) {
    
    return (
        <div className="commentContainer">
            <Avatar src={userLogged.avatar} />
            <textarea
                rows={1}                
                placeholder="Adicione um comentario...">
            </textarea>

            <button
                type="button"
                className="btnPublish desktop"
                // onClick={fazerComentario}
            >
                Publicar
            </button>
        </div>
    )
}
