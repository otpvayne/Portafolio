import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Tools from "@/components/Tools";
import Contact from "@/components/Contact";
import Friends from "@/components/Friends";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Tools />
        <Contact />
        <Friends />
      </main>
      <Footer />
    </>
  );
}
