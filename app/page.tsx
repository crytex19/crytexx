import Preloader from '@/components/Preloader';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import HowWeWork from '@/components/HowWeWork';
import BookingForm from '@/components/BookingForm';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Gallery />
        <HowWeWork />
        <BookingForm />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
