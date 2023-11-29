import PostContent from "@/components/posts/post-detail/PostContent";
import { getPostData, getPostsFiles } from "@/lib/posts-util";
import Head from "next/head";

const PostPage = (props) => {
    const { postData } = props;

    return (
        <>
        <Head>
            <title>{postData.title}</title>
            <meta name="description" content={postData.excerpt} />
        </Head>
        <PostContent post={postData} />
        </>
    )
}

export function getStaticProps(context) {
    const { params } = context; 

    const { slug } = params;

    const postData = getPostData(slug);

    return {
        props : {
            postData : postData
        },
        revalidate : 600
    }
}

export function getStaticPaths() {
    const postsFilenames = getPostsFiles();

    const slugs = postsFilenames.map((fileName) => fileName.replace(/\.md$/, ''));

    return {
        paths : slugs.map((slug) => ( { params : { slug : slug } } )),
        fallback : false, // all slugs are pre rendered
    }
}

export default PostPage;