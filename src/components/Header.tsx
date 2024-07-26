const Header = () => {
  return (
    <header className="flex flex-row justify-between bg-[#011627] border border-[#1E2D3D] rounded-t-lg ">
      <div className="flex flex-row justify-center items-center"> 
        <p className="text-[16px] p-4 md:pr-[80px] md:border-r md:border-[#1E2D3D] lg:pr-[150px]">jamille-araujo</p>
        <p className="hidden text-[16px] md:block md:p-4 md:border-r md:border-[#1E2D3D]">_hello</p>
        <p className="hidden text-[16px] md:block md:p-4 md:border-r md:border-[#1E2D3D]">_about-me</p>
        <p className="hidden text-[16px] md:block md:p-4 md:border-r md:border-[#1E2D3D]">_projects</p>
      </div>

      <p className="hidden md:block md:text-[16px] md:p-4 md:border-l md:border-[#1E2D3D]">_contact-me</p>
      <p className="text-[16px] p-4 md:hidden">icon</p>
    </header>
  )
}


export default Header;
