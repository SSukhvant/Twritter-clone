import Feed from '@/components/Feed'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
     <Sidebar/>
     <Feed/>
    </main>
  )
}
