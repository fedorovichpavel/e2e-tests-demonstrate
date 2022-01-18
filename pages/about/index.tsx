import React from 'react'
import Router from 'next/router'
import {MainLayout} from '../../components/MainLayout'

export default function About({ title, text }) {

  const linkClickHandler = () => {
    Router.push('/')
  }

  return (
    <MainLayout title={'About Page'}>
      <h1>{title}</h1>
      <p>{text}</p>
      <button onClick={linkClickHandler}>Go back to home</button>
      <button onClick={() => Router.push('/posts')}>Go to posts</button>
    </MainLayout>
  )
}

About.getInitialProps = async () => {
  const response = await fetch(`${process.env.API_URL}/about`)
  const data = await response.json()

  return {
    title: data.title,
    text: data.text
  }
}