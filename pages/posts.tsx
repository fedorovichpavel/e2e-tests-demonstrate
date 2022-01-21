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
  const [reload, setReload] = useState(false)

  useEffect(() => {
    if (!modal) {
      const load = async () => {
        const response = await fetch('http://localhost:4300/posts')
        const json = await response.json()
        setPosts(json)
      }
  
      if (!serverPosts) {
        load()
      }
    }
  }, [reload])

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
      setReload(prev => !prev)
      setModal(false)
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