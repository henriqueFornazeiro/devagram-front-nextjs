import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Button from '../components/button'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <h1>Ola mundo</h1>
      <Button text={"Login"} color={"primary"} disabled={false}/>
    </>
  )
}
