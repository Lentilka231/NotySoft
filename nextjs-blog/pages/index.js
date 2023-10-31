import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from "../components/Navbar"
import Layout from '../components/Layout';
import WhitePage from "../components/WhitePage"
export default function Home(){
  return (
    <>
        <Navbar />
        <WhitePage />
    </>
  )
}