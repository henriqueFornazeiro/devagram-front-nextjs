import withAuth from "@/hoc/withAuth";

function Home() {
  return <h1>Home</h1>;
}

export default withAuth(Home);
