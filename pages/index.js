import Hero from '../components/home-page/Hero';
import FeaturedPosts from '../components/home-page/FeaturedPosts';
import { getFeaturedPosts } from '@/lib/posts-util';
import Head from 'next/head';

const HomePage = (props) => {
  const { featuredPosts } = props;

  return (
    <>
    <Head>
      <title>Marin's Blog</title>
      <meta name='description' content='Marin post about Javascript, React and blockchain development' />
    </Head>
    <Hero />
    <FeaturedPosts posts={featuredPosts}/>
    </>
  )
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props : {
      featuredPosts : featuredPosts
    },
    revalidate : 1800
  }
};

export default HomePage;