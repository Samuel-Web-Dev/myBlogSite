import ReactMarkdown from 'react-markdown'
import PostHeader from './post-header'

import classes from './post-content.module.css'
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const PostContent = (props) => {
  const { posts } = props;
  const imagePath = `/images/posts/${posts.slug}/${posts.image}`

  const customRenderers = {
    // img: ({ node, ...props }) => (
    //   <div className={classes.image}>
    //     <Image
    //       src={`/images/posts/${posts.slug}/${props.src}`}
    //       alt={props.alt}
    //       width={600}
    //       height={300}
    //     />
    //   </div>
    // ),

    p: ({ node, children }) => {
      if (
        node.children[0]?.type === "element" &&
        node.children[0]?.tagName === "img"
      ) {
        const image = node.children[0];
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${posts.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{children}</p>;
    },

    code: ({ language, value }) => (
      <SyntaxHighlighter
        style={atomDark}
        language={language}
        children={value}
      />
    ),
  };

  return (
    <article className={classes.content}>
      <PostHeader title={posts.title} image={imagePath} />
      <ReactMarkdown components={customRenderers} children={posts.content} />
    </article>
  );
}

export default PostContent