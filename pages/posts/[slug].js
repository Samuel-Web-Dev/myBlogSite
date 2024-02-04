import { getPostData, getPostFiles } from "@/lib/post-util";
import PostContent from "../components/posts/post-detail/post-content";

function ProductDetailPage(props) {
  const { post } = props;
  return <PostContent posts={post} />;
}

export async function getStaticProps(context) {
  const { params } = context;

    if (!params || !params.slug) {
      return {
        notFound: true,
      };
    }
  const slug = params.slug;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  const postFiles = getPostFiles();

  const slugs = postFiles.map((postFile) => postFile.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default ProductDetailPage;
