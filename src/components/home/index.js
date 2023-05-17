import withAuth from "@/hoc/withAuth";
import Feed from "../feed";

function Home({userLogged}) {
  return (
    <Feed userLogged={userLogged}/>  
  );
}

export default withAuth(Home);
