import AllPosts from "@/components/posts/AllPosts";
import { getAllPosts } from "@/lib/posts-util";
import Head from "next/head";

const AllPostsPage = (props) => {
    const { allPosts } = props;

    return (
        <>
        <Head>
            <title>All Posts</title>
            <meta name="description" content="Look at all my blog posts about web and blockchain development" />
        </Head>
        <AllPosts posts={allPosts}/>
        </>
    )
}

export function getStaticProps() {
    const allPosts = getAllPosts();

    return {
        props : {
            allPosts : allPosts
        }
    }
}

export default AllPostsPage;