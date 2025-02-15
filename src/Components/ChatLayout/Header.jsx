import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import LOGO from "../../assets/images/proxion.png";
import Title from '../../Title';
import NotesViewModal from './NotesViewModal';
import Mode from './Mode';

const Header = ({
  chat_id
}) => {


  return (
    <div className='w-full'>
      <div className='flex rounded-lg justify-between items-center p-3 md:px-2 lg:px-5'>
        <Link to="/" className="flex items-center">
          <img src={LOGO} alt="Proxion Logo" className="h-10 w-auto" />
          <Title />
        </Link>
        <div className='flex items-center md:space-x-2'>
          <Mode />
          {
            chat_id &&
            <>
              <NotesViewModal chat_id={chat_id} />
            </>
          }
          <ProfileMenu />
        </div>
      </div>
    </div>
  )
}

export default Header