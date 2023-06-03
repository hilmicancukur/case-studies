import Image from 'next/image'
import styles from './page.module.css'
import Header from './components/header'
import Footer from './components/footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className='page'>
        <section className="container">
          <div className="grid-cards"></div>
        </section>
      </main>
      <Footer />
    </>
  )
}
