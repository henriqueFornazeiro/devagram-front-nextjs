import HeaderAction from "../../components/headerActions";
import UploadImagem from "../../components/uploadImage";
import imgPublication from "../../public/images/img-preview-publication.svg";
import icontChevronLeft from "../../public/images/chevron-left.svg";
import withAuth from "../../hoc/withAuth";
import { useState } from "react";
import Button from "../../components/button";
import FeedService from "../../services/FeedService";
import { useRouter } from "next/router";

const limitDescription = 255;
const feedService = new FeedService();

function Publication() {
  const [image, setImage] = useState();
  const [inputImage, setInputImage] = useState();
  const [stage, setStage] = useState(1);
  const [description, setDescription] = useState("");
  const router = useRouter();

  const isStageOne = () => stage === 1;

  const getTextLeft = () => {
    if (isStageOne() && image) {
      return "Cancelar";
    }

    return "";
  };

  const getTextRight = () =>{
    if(!image){
        return ""
    }

    if(isStageOne() && image){
        return "Avançar"
    }

    return "Compartilhar";
  }

  const btnCancel = () => {

    if(stage === 1){
        inputImage.value = null;
        setImage(null);
        return
    }

    setStage(1);
  }

  const btnAdvance = () =>{
    if(isStageOne()){
      setStage(2);
      return;
    }

    publish();
  }

  const getClassNameHeader = () =>{
    if(isStageOne()){
        return "firstStage"
    }

    return "secondStage"
  }
  

  const publish = async () =>{
    try {
      if(!validateForm()){
        alert("A descrição precisa ter mais de 3 caracteres e/ou a imagem precisa ser selecionada.")
        return
      }

      const body = new FormData();
      body.append('description', description);
      body.append('file', image.arquivo)

      await feedService.addPost(body);

      router.push('/');

    } catch (e) {
      alert("Erro ao salvar publicação.");
    }
  }

  const validateForm = () =>{    
    return (
      description.length >= 3 && image?.arquivo
    )
  }

  return (
    <div className="publicationPage width30pctDesktop">
      <HeaderAction
        className={getClassNameHeader()}
        iconLeft={isStageOne() ? null : icontChevronLeft}
        textLeft={getTextLeft()}
        handleClickLeft={btnCancel}
        rightElement={getTextRight()}
        handleClickRight={btnAdvance}
        title="Nova Publicação"
      />
      <hr className="divideBorder" />

      <div className="publicationContent ">
        {
            isStageOne() ? (
                <div className="firstStage">
                    <UploadImagem
                        setImagem={setImage}
                        aoSetarAReferencia={setInputImage}
                        imagemPreviewClassName={
                        !image ? "previewImagemPublicacao" : "previewImageSelected"
                        }
                        imagePreview={image?.preview || imgPublication.src}
                    />

                    <span className="desktop dragAndDrop">Arraste sua foto aqui</span>

                    <Button
                        text="Selecionar uma imagem"
                        handleClick={() => inputImage?.click()}
                        color="none"
                    />
                </div>
            ) : (
                <>                
                    <div className="secondStage">
                        <UploadImagem
                            setImagem={setImage}
                            imagePreview={image?.preview}
                        />
                        <textarea 
                            rows={3}
                            value={description}
                            placeholder="Escreva sua legenda..."
                            onChange={e => setDescription(e.target.value)}>
                        </textarea>
                        
                    </div>
                    <hr className="divideBorder" />
                </>
            )
        }
        
      </div>
    </div>
  );
}

export default withAuth(Publication);
