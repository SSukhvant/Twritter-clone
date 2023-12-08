import PostPage from "@/components/PostPage";
import { getServerSession } from 'next-auth';
import Login from "../(auth)/Login/page";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export async function generateMetadata({ params }: { params: { id: string } }) {
    const id = params.id;
    const postDoc = await getDoc(doc(db, 'posts', id));
    const post: DocumentData | undefined = postDoc.data();
    return {
        title: `${post?.username} on Twitter: ${post?.text}`
    }
}

async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) return <Login />;

  return (
    <>
    <PostPage params={params}/>
    </>
  );
}

export default Page;
