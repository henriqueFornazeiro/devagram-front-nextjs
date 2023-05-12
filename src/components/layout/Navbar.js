import iconHome from '../../../public/images/home.svg'
import iconHomeActive from '../../../public/images/home-active.svg'
import iconUser from '../../../public/images/user-gray.svg'
import iconUserActive from '../../../public/images/user.svg'
import iconPlusPublication from '../../../public/images/plus-square.svg'
import iconPlusPublicationActive from '../../../public/images/plus-square-active.svg'
import Image from 'next/image'

export default function Navbar({className}){
    return (
        <nav className={`navbar ${className}`}>
            <ul>
                <li>
                    <Image
                        src={iconHomeActive}
                        alt='icon home'
                        width={20}
                        height={20}
                    />
                </li>
                <li>
                    <Image
                        src={iconPlusPublication}
                        alt='icon publication'
                        width={20}
                        height={20}
                    />
                </li>
                <li>
                    <Image
                        src={iconUser}
                        alt='icon user'
                        width={20}
                        height={20}
                    />
                </li>
            </ul>
        </nav>
    )
}