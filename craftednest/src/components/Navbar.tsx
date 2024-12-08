// const Navbar = ()=>{
//     return ();    // can be written like this
// }
// export default Navbar
import Image from "next/image";
import logo from "../../.next/image/Logo.jpg" // imported image from default name
import Menu from "./Menu";

export default function Navbar() {
    return(
        <div >           {/*for all screen type padding for logo*/}
        <Image src={logo} alt="logo" className=" ml-4 w-[130px] h-[100px] sm:w-[160px] sm:h-[120px] md:w-[180px] md:h-[130px]  lg:w-[200px] lg:h-[140px] xl:w-[250px] xl:h-[170px] 2xl:w-[250px] 2xl:h-[170px] "></Image>
        {/* for Mobile*/}
        <Menu/>
        </div> 
    );
}