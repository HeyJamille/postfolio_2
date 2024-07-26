// Components
import SnakeGame from "../components/SnakeGamer";

const Home = () => {
  return (
    <article className="p-5 pt-[100px] h-screen bg-[#011627] border border-[#1E2D3D] sm:flex sm:flex-col sm:justify-center sm:items-center sm:gap-10 sm:pt-5 lg:flex-row lg:gap-20">
      <section className="flex flex-col gap-44 sm:gap-7">
        <div> 
          <h2 className="text-[16px]">Hi all. I am</h2>
          <h1 className="text-[50px] leading-[62px]">Jamille Araujo</h1>
          <h2 className="text-[#43D9AD]"> {'>'} Font-end developer</h2>
        </div>
        
        <div className="flex flex-col gap-2 sm:gap-1">
          <div> 
            <p className="block sm:hidden">// Find me profile on Github:</p>
            <p className="hidden sm:block">// complete the game to continue</p>
            <p className="hidden sm:block">// you can also see it on my Github page</p>
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
    </article>
  )
}

export default Home;
