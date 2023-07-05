import HeaderAction from "@/components/headerActions";
import UploadImagem from "@/components/uploadImage";
import imgPublication from "../../../public/images/img-preview-publication.svg";
import withAuth from "@/hoc/withAuth";
import { useState } from "react";
import Button from "@/components/button";

function Publication() {
  const [image, setImage] = useState();
  const [inputImage, setInputImage] = useState();

  return (
    <div className="publicationPage width30pctDesktop">
      <HeaderAction
        textLeft=""
        rightElement=""
        title="Nova Publicação"
      />
      <hr className="divideBorder" />

      <div className="publicationContent ">
        <div className="firstStage">
          <UploadImagem
            setImagem={setImage}
            aoSetarAReferencia={setInputImage}
            imagemPreviewClassName={!image ? "previewImagemPublicacao" : "previewImageSelected"}
            imagePreview={image?.preview || imgPublication.src}
          />

            <span className="desktop dragAndDrop">
                Arraste sua foto aqui
            </span>

          <Button
            text="Selecionar uma imagem"
            handleClick={() => inputImage?.click()}
            color="none"
          />
        </div>
      </div>
    </div>
  );
}

export default withAuth(Publication);