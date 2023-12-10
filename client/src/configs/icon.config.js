import { HiOutlineHome} from 'react-icons/hi';
import {TbLayoutDashboard,TbInfoHexagon,TbLogout,TbBrandAuth0} from "react-icons/tb"
import { LiaTasksSolid } from "react-icons/lia";
import { MdOutlineTask } from "react-icons/md";
const navigationIcon = {
  home: <HiOutlineHome />,
  dashboard:<TbLayoutDashboard/>,
  "my-tasks":<LiaTasksSolid/>,
  "task-assignment":<MdOutlineTask/>,
  info:<TbInfoHexagon/>,
  logout:<TbLogout/>,
  authorization:<TbBrandAuth0/>
};

export default navigationIcon;
