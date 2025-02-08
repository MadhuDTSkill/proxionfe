import { ReactTyped } from 'react-typed';

const Footer = () => {
  // Get current year
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex justify-evenly items-center py-1">
      <ReactTyped showCursor={false} typeSpeed={20} strings={["<div class='flex items-center'><p class='text-[10px]'>Powered by</p> <span class='ml-2 text-[12px] font-main font-bold'> Madhu</span></div>"]} />
      <ReactTyped showCursor={false} typeSpeed={20} strings={[`<div><p class='text-[12px]'>&copy; ${currentYear}. All rights reserved.</p></div>`]} />
    </div>
  );
};

export default Footer;
