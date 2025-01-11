"use client"
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BellIcon, Hand, User,Home, LayoutGrid, Globe, Medal,Menu, Import } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from 'react';
import Image from "next/image";
import Dropdown from "../common/selectComp";
import { useAuth } from "@/context/authContext";


interface LogoutResponse {
  message: string;
}


export const Header = ()=>{
    const router = useRouter();
    const pathname = usePathname();
    const {user,logout} = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleDropdownSelect = async (value: string) => {
    setSelectedOption(value);
    if (value === "profile") {
       router.push("dashboard/profile");
    } else if (value === "logout") {
    await handleLogout();       
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout.");
    }
  };

  const options = [
    { label: "Profile", value: "profile" },
    { label: "Logout", value: "logout" }
];


    const navItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
        { href: "/website", label: "Website", icon: Globe },
        { href: "/results", label: "Results", icon: Medal }
      ];
    

    return (
        <header className="border-b bg-[#FFFFFF] fixed top-0 left-0 w-full z-10">
          <div className="w-full h-[66px] mx-auto px-4 sm:px-20 flex items-center justify-between">
            
              {/* Left section */}
              <div className="flex items-center gap-12 md:gap-6">
                <Link href="/">
                  <div className="flex items-center gap-1 w-[187px] h-[32px] md:w-[127px]">
                    <div className="w-[32px] h-[32px]">
                     <img 
                      src="/logo.jpeg" 
                      alt="Logo"
                      className="w-full h-full object-contain" 
                     />
                    </div>
                    <span className="font-sans font-normal text-sm leading-4">GDG JSSATEN</span>
                  </div>
                </Link>
                </div>
                
                
            <nav className=" hidden sm:flex items-center  w-[606.88px] h-[32px] gap-[19.58px]">
              {navItems.map((item) => (
                <Link href={item.href} key={item.href} className="h-full">
                  <Button 
                    variant="ghost"
                    className={`gap-2 ${pathname === item.href ? " text-black" : ""}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-sans font-normal text-sm leading-4">{item.label}</span>
                  </Button>
                </Link>
              ))}
            </nav>
           
          <div className="flex items-center w-[267px] h-[36px] gap-1 sm:gap-[16px]">
            <Button variant="outline"
             className="w-[133px] h-[36px] gap-1 rounded-[22px] border border-[#000000] px-3 py-2" 
             onClick={() => router.push("/help")}>
              <Hand size={18} />
              <span className="sm:inline  font-sans font-normal text-sm leading-4">I Have a doubt?</span>
            </Button>

            <Button variant="ghost" className="w-[36px] h-[36px] rounded-[37px] border border-[#DDE3FF] p-[8px] bg-[#FFFFFF]">
              <BellIcon className="h-5 w-5" />
            </Button>

           <div className=" hidden sm:block"> 
             <Button variant="ghost" className=" w-[66px] h-[36px] rounded-[37px] border border-[#DDE3FF] p-[8px] bg-[#FFFFFF]">
              <Image src="/avatar.png" alt="User" 
                          width={26}
                          height={26}
                          className=" rounded-full" />
              <Dropdown options={options} onSelect={handleDropdownSelect} />
              {selectedOption && (
              <span className="sr-only">
                Selected: {selectedOption}
              </span>
      )}
            </Button> </div>


            <div className="md:hidden flex items-center z-50">
            <Button
               variant="ghost"
              className=" rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        >
              <Menu className="h-6 w-6" />
            </Button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 w-full bg-white shadow-md p-4">
            <nav className="">
              {navItems.map((item) => (
                <Link href={item.href} key={item.href} className="w-full ite">
                  <Button
                    variant="ghost"
                    className={`gap-2 ${pathname === item.href ? 'text-black' : ''} w-full text-left`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-sans font-normal text-sm leading-4">{item.label}</span>
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        )}
    
        </div>
      </div>
    </header>
     );
}

export default Header;