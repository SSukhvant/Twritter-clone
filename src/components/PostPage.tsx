"use client"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { modalState } from "@/atoms/modalAtom";
import {
  DocumentData,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Post from "@/components/Post";
import Sidebar from "@/components/Sidebar";
import { useRouter} from "next/navigation";
import { db } from "../../firebase";
import Comment from "./Comments";
import Modal from "./Modal";

type paramsProps = {
    params: {
      id: string;
    };
  };

function PostPage({ params }: paramsProps) {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [post, setPost] = useState<DocumentData | undefined>();
  const [comments, setComments] = useState<DocumentData | undefined>([]);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    onSnapshot(doc(db, "posts", id), (snapshot) => {
      setPost(snapshot.data() as DocumentData);
    });
  }, [db, id]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs as DocumentData)
      ),
    [db, id]
  );

  return (
    <div>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            <div
              className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
              onClick={() => router.push("/")}
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            Tweet
          </div>

          <Post id={id} post={post} postPage />
          {comments?.length > 0 && (
              <div className="pb-72">
                {comments?.map((comment: any) => (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    comment={comment.data()}
                  />
                ))}
              </div>
            )}
        </div>
        {isOpen && <Modal />}
      </main>
    </div>
  );
}

export default PostPage;
