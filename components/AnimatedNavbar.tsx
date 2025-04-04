"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth.action";

const AnimatedNavbar = () => {
    const navRef = useRef<HTMLElement>(null);
    const signOutBtnRef = useRef<HTMLButtonElement>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const navElement = navRef.current;
        const signOutBtn = signOutBtnRef.current;
        
        if (navElement && signOutBtn) {
            // Set initial state (invisible and above final position)
            gsap.set(navElement, { 
                opacity: 0, 
                y: -50 
            });
            
            // Set initial state for sign-out button (invisible and shifted right)
            gsap.set(signOutBtn, {
                opacity: 0,
                x: 30
            });
            
            // Animate navbar to final state
            gsap.to(navElement, { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                ease: "power2.out",
                delay: 0.2 // Small delay for better effect
            });
            
            // Animate sign-out button with a slight delay after navbar
            gsap.to(signOutBtn, {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
                delay: 0.7 // Delay after navbar animation starts
            });
        }
    },[]);
    
    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            await signOut();
            router.push("/sign-in");
        } catch (error) {
            console.error("Sign out failed:", error);
            setIsLoading(false);
        }
    };

    return (
        <nav ref={navRef} className="flex justify-between items-center w-full">
            <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32}/>
                <h2 className="text-primary-100">PrepWise</h2>
            </Link>
            
            <Button 
                ref={signOutBtnRef}
                onClick={handleSignOut}
                variant="ghost" 
                className="text-primary-100 hover:text-primary-100/80 hover:bg-background/10"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-100 border-t-transparent"></span>
                        Signing Out...
                    </>
                ) : (
                    "Sign Out"
                )}
            </Button>
        </nav>
    );
};

export default AnimatedNavbar;