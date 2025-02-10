import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import LOGO from "../../assets/images/proxion.png";
import Title from '../../Title';
import NotesViewModal from './NotesViewModal';

const Header = ({
  chat_id
}) => {


  return (
    <div className='w-full'>
      <div className='flex rounded-lg justify-between items-center p-1.5 md:px-2 lg:px-5'>
        <Link to="/" className="flex items-center">
          <img src={LOGO} alt="Proxion Logo" className="h-10 w-auto" />
          <Title />
        </Link>
        <div className='flex items-center space-x-2'>
          {
            chat_id &&
            <NotesViewModal chat_id={chat_id} />
          }
          <ProfileMenu />
        </div>
      </div>
    </div>
  )
}

export default Header