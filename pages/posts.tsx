import {useState, useEffect} from 'react'
import Head from 'next/head'
import {MainLayout} from '../components/MainLayout'
import Link from 'next/link'
import {MyPost} from '../interfaces/post'
import {NextPageContext} from 'next'
import { ModalComponent } from '../components/Modal'

interface PostsPageProps {
  posts: MyPost[]
}

export default function Posts({ posts: serverPosts }: PostsPageProps) {
  const [posts, setPosts] = useState(serverPosts)
  const [modal, setModal] = useState(false)

  const load = async () => {
    const response = await fetch('http://localhost:4300/posts')
    const json = await response.json()
    setPosts(json)
  }

  useEffect(() => {
    if (!modal) {
      if (!serverPosts) {
        load()
      }
    }
  }, [])

  if (!posts) {
    return <MainLayout>
      <p>Loading ...</p>
    </MainLayout>
  }

  const addPost = async (data) => {
    try {
      await fetch(`http://localhost:4300/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      setModal(false)
      setPosts(null)
      load()
    } catch (e) {

    }
  }

  return (
    <MainLayout>
      <ModalComponent isOpen={modal} onFinish={addPost}  closeModal={() => setModal(false)} />
      <Head>
        <title>Posts Page | e2e\nextJs</title>
      </Head>
      <h1>Posts Page</h1>
      <ul data-cy='posts-list'>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/post/[id]`} as={`/post/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <button data-cy='add-new-post-button' onClick={() => setModal(true)}>
        Add new
      </button>
      <style jsx>{`
        button {
          padding: 5px 10px;
          background: #0000ff;
          color: #fff;
          font-size: 20px;
          outline:none;
          border: none;
        }
        button:hover {
          cursor: pointer;
          background: #5858ff;
        }
        ul {
          list-style: none;
        }
        li {
          line-height: 50px;
        }
        a {
          border: solid 1px #a6a6a6;
          padding 5px 10px;
          text-decoration: none;
          transition: all 0.5s;
        }
        a:hover {
          background: #a6a6a6;
        }
      `}</style>
    </MainLayout>
  )
}

Posts.getInitialProps = async ({req}: NextPageContext) => {
  if (!req) {
    return {posts: null}
  }

  const response = await fetch(`${process.env.API_URL}/posts`)
  const posts: MyPost[] = await response.json()

  return {
    posts
  }
}