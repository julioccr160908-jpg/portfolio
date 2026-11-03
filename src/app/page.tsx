import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import TechStack from '@/components/sections/TechStack';
import Process from '@/components/sections/Process';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Projects />
        <TechStack />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
