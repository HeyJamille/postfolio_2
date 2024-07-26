// Assets
import whatsapp from '../assets/whatsapp.svg';
import twiter from '../assets/twiter.svg';
import github from '../assets/github.svg';

const Footer = () => {
  return (
    <footer className="flex flex-row mb-5 bg-[#011627] border border-[#1E2D3D] rounded-b-lg md:mb-10 sm:justify-between" >
      <div className="flex flex-row justify-center items-center"> 
        <p className="p-4 border-r border-[#1E2D3D]">find me in:</p>
        <img className="p-4 border-r border-[#1E2D3D]" src={twiter}  />
        <img className="p-4 border-r border-[#1E2D3D]" src={whatsapp} />
      </div>

      <div className="flex flex-row"> 
        <p className="hidden sm:block sm:p-4 sm:self-center sm:border-l sm:border-[#1E2D3D]">@Hey_Jamille</p>
        <img src={github} className="pl-4 sm:pr-4 sm:pl-0"/>
      </div>
    </footer>
  )
}

export default Footer