import Feed from '@/components/Feed'
import Sidebar from '@/components/Sidebar'
import { getServerSession } from 'next-auth';
import Login from './(auth)/Login/page';
import { useRecoilState } from 'recoil';
import { modalState } from '@/atoms/modalAtom';
import Modal from '@/components/Modal';

export default async function Home() {
  const session = await getServerSession();
  // const [isOpen, setIsOpen] = useRecoilState(modalState);
  if(!session) return <Login/>
  return (
  <>
    <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
     <Sidebar/>
     <Feed/>
     <Modal/>
    </main>
    </>
  )
}