
const Navbar = () => {
  return (
    <nav className='flex justify-around bg-slate-600 text-white p-4'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>iDo</span>
        </div>
        <ul className="flex gap-8">
            <li className='cursor-pointer hover:font-bold transition-all duration-300'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-300'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
