import iconHome from "../../public/images/home.svg";
import iconHomeActive from "../../public/images/home-active.svg";
import iconUser from "../../public/images/user-gray.svg";
import iconUserActive from "../../public/images/user.svg";
import iconPlusPublication from "../../public/images/plus-square.svg";
import iconPlusPublicationActive from "../../public/images/plus-square-active.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const routerMaps = {
  home: {
    imgActive: iconHomeActive,
    imgMain: iconHome,
    routes: ["/"],
  },
  newPublication: {
    imgActive: iconPlusPublicationActive,
    imgMain: iconPlusPublication,
    routes: ["/publication"],
  },
  userProfile: {
    imgActive: iconUserActive,
    imgMain: iconUser,
    routes: ["/profile/me", "/profile/edit"],
  },
};

export default function Navbar({ className }) {
  const [activeRoute, setActiveRoute] = useState("home");
  const router = useRouter();

  useEffect(() => {
    defineActiveRoute();
  }, [router.asPath]);

  const defineActiveRoute = () => {
    const routerMapsKey = Object.keys(routerMaps);

    const activeIndex = routerMapsKey.findIndex((key) => {
      return routerMaps[key].routes.includes(window.location.pathname);
    });

    if (activeIndex === -1) {
      setActiveRoute("home");
    } else {
      setActiveRoute(routerMapsKey[activeIndex]);
    }

  };

  const getImage = (routeName) => {
    const routerImg = routerMaps[routeName];
    if (routeName === activeRoute) {
      return routerImg.imgActive;
    }

    return routerImg.imgMain;
  };

  const handleClickMenu = (routeName) =>{
    setActiveRoute(routeName);
    router.push(routerMaps[routeName].routes[0])
  }

  return (
    <nav className={`navbar ${className}`}>
      <ul>
        <li onClick={()=>handleClickMenu('home')}>
          <Image 
            src={getImage('home')} 
            alt="icon home" 
            width={20} 
            height={20} />
        </li>
        <li onClick={()=>handleClickMenu('newPublication')}>
          <Image
            src={getImage('newPublication')}
            alt="icon publication"
            width={20}
            height={20}
          />
        </li>
        <li onClick={()=>handleClickMenu('userProfile')}>
          <Image 
            src={getImage('userProfile')} 
            alt="icon user" 
            width={20} 
            height={20} />
        </li>
      </ul>
    </nav>
  );
}
