import HeaderAction from "@/components/headerActions";
import UploadImagem from "@/components/uploadImage";
import imgPublication from "../../../public/images/img-preview-publication.svg";
import icontChevronLeft from "../../../public/images/chevron-left.svg";
import withAuth from "@/hoc/withAuth";
import { useState } from "react";
import Button from "@/components/button";

function Publication() {
  const [image, setImage] = useState();
  const [inputImage, setInputImage] = useState();
  const [stage, setStage] = useState(1);
  const [description, setDescription] = useState("");
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

    setStage(1)
  }

  const btnAdvance = () =>{
    setStage(2);
  }

  const getClassNameHeader = () =>{
    if(isStageOne()){
        return "firstStage"
    }

    return "secondStage"
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
