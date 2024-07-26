import Footer from "../components/Footer";
import Header from "../components/Header";
import SnakeGame from "../components/SnakeGamer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex flex-col justify-center items-center p-5 bg-[#011627] border border-[#1E2D3D] sm:gap-12 lg:flex-row lg:gap-20">
        <section className="flex flex-col justify-center items-center gap-12 sm:gap-7">
          <div>
            <h2 className="text-[16px]">Hi all. I am</h2>
            <h1 className="text-[50px] leading-[62px]">Jamille Araujo</h1>
            <h2 className="text-[#43D9AD]"> {'>'} Front-end developer</h2>
          </div>

          <div className="flex flex-col gap-2 sm:gap-1">
            <div>
              <p className="block sm:hidden">// Find me profile on Github:</p>
              <p className="hidden sm:block">// Complete the game to continue</p>
              <p className="hidden sm:block">// You can also see it on my Github page</p>
            </div>

            <div>
              <p className="text-red-500 inline">const</p>
              <p className="text-[#43D9AD] inline"> githubLink</p>
              <p className="text-blue-500 inline"> = </p>
              <p className="text-yellow-500 inline"> “https://github.com/example/url”</p>
            </div>
          </div>
        </section>

        <SnakeGame />
      </main>

      <Footer />
    </div>
  )
}

export default Home;
