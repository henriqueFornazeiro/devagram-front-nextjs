import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Button from '../components/button'
import Avatar from '../components/avatar'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <h1>Ola mundo</h1>
      <Avatar/>
      <Button text={"Login"} color={"primary"} disabled={false}/>
    </>
  )
}
