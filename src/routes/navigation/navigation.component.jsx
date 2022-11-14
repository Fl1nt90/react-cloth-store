import { Fragment } from "react";
import { Outlet, Link} from "react-router-dom";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import './navigation.style.scss'

const Navigation = () => { /* TOP LEVEL COMPONENT, PERSISTENT */
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to='/'>  {/* logo is now anchored to the home page/base link */}
          <CrownLogo className="logo"/>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to='/shop'>
            SHOP
          </Link>
          <Link className="nav-link" to='/sign-in'>
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet /> {/* where to render all the children components */}
    </Fragment>
  )
}

export default Navigation;