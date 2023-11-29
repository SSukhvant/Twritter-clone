import Feed from '@/components/Feed'
import Sidebar from '@/components/Sidebar'
import { getServerSession } from 'next-auth';
import Login from './(auth)/Login/page';

export default async function Home() {
  const session = await getServerSession();
  if(!session) return <Login/>
  return (
  <>
    <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
     <Sidebar/>
     <Feed/>
    </main>
    </>
  )
}