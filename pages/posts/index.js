import { getAllPosts } from "@/lib/post-util";
import AllPosts from "../components/posts/all-posts"


const DUMMY_POSTS = [
  {
    slug: "getting-started-with-nextjs1",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is a React framework for production - it makes building fullstack React app easy",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextjs2",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is a React framework for production - it makes building fullstack React app easy",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextjs3",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is a React framework for production - it makes building fullstack React app easy",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-nextjs4",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is a React framework for production - it makes building fullstack React app easy",
    date: "2022-02-10",
  },
];


const AllPostsPage = (props) => {
  return (
     <AllPosts posts={props.posts} />
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts() 
  return {
    props: {
      posts: allPosts
    }
  }
}

export default AllPostsPage