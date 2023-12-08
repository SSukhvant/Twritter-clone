import Feed from '@/components/Feed'
import Sidebar from '@/components/Sidebar'
import { getServerSession } from 'next-auth';
import Login from './(auth)/Login/page';
import Modal from '@/components/Modal';
import Widgets from '@/components/Widgets';

export default async function Home() {
  const session = await getServerSession();
  const trendingResultsData = await getTrendingResults()
  const followResultsData = getFollowResults()
  const [ trendingResults, followResults ] = await Promise.all([trendingResultsData,followResultsData])
  console.log(trendingResults)
  console.log(followResults)
  if(!session) return <Login/>
  return (
  <>
    <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
     <Sidebar/>
     <Feed/>
     <Modal/>
     <Widgets trendingResults={trendingResults} followResults={followResults}/>
    </main>
    </>
  )
}

async function getTrendingResults() {
  try {
    const res = await fetch('https://www.jsonkeeper.com/b/NKEV');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching trending results:', error);
  }
}

async function getFollowResults() {
  try {
    const res = await fetch('https://www.jsonkeeper.com/b/WWMJ');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching follow results:', error);
  }
}
