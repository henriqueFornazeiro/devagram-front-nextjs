export class LoadingHelper{
    static show(){
        document
            .querySelector(".loadingContainer")
            ?.classList.remove("oculto");
    }

    static hidden(){
        
        setTimeout(()=>{
            document
            .querySelector(".loadingContainer")
            ?.classList.add("oculto");
        },500);
        
    }
}