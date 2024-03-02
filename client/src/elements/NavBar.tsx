"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";





const components: { title: string; href: string; description: string }[] = [
  {
    title: "Profile",
    href: "/profile",
    description: "Modify your personal information here.",
  },
  {
    title: "Settings",
    href: "/settings",
    description: "Manage your subscriptions, notifications in here.",
  },
  {
    title: "My Study Resources",
    href: "/resources",
    description: "View your uploaded and purchased resources.",
  },
  {
    title: "My Points",
    href: "/points",
    description: "View your points and purchase histories.",
  },
  {
    title: "Favorite Classes",
    href: "/fav-classes",
    description: "Go to your favorite classes.",
  },
  {
    title: "Completed Classes",
    href: "/comp-classes",
    description: "Go to classes that you've taken.",
  },
];

const account: { title: string; href: string; description: string }[] = [
  {
    title: "Sign In",
    href: "/signin",
    description: "Log in to your existing account.",
  },
  {
    title: "Sign Up",
    href: "/signup",
    description: "Create a new account.",
  },
];




export function NavBar() {
  const navigate = useNavigate();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    let data = "";
    if (inputRef.current) {
      if (inputRef.current.value.trim() !== "") {
        console.log("inputRef.current.value", inputRef.current.value);
        data = inputRef.current.value.toString();
        navigate("/search", { state: data });
      } else {
        alert("Please provide valid keyword to search.");
      }
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);  // Add a loading state






  useEffect(() => {


    const checkSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setLoading(false);  // Set loading to false after session is fetched
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [])



  const logout = async () => {
    await supabase.auth.signOut();
  };


  return (

    <div className="min-h-20 grid grid-cols-6">
      <div className="col-start-1 col-end-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Home</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/about"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          About Notes-Share
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          streamline your learning process, enhance access to
                          comprehensive study resources, and ultimately improve
                          your academic performance.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/" title="Feed">
                    What's going on around you.
                  </ListItem>
                  <ListItem href="/features" title="Features">
                    Explore new features just for you.
                  </ListItem>
                  <ListItem href="/courses" title="Courses">
                    View all courses supported on our platform.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {!loading && session &&
              <NavigationMenuItem>
                <NavigationMenuTrigger>My</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>

                </NavigationMenuContent>
                {/* <Button variant="destructive">
                  Log Out
                </Button> */}
              </NavigationMenuItem>

            }


          </NavigationMenuList>
        </NavigationMenu>
      </div>


      {!loading && session &&
        <div className="col-end-9 col-span-2">
          <div className="grid grid-cols-5 gap-1">
            <div className="col-span-2">
              <Input ref={inputRef} onKeyDown={handleEnter} />
            </div>
            <div>
              <Button variant="outline" onClick={handleSearchClick}>
                <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
            <div className="col-span-1">

              <NavLink to="/">
                <Button variant="destructive" onClick={logout}>
                  Log Out
                </Button>
              </NavLink>
            </div>

          </div>
        </div>
      }

      {!loading && !session &&
        <div className="col-end-9 col-span-2">
          <div className="grid grid-cols-5 gap-1">
            <div className="col-span-2">
              <Input />
            </div>
            <div>
              <Button variant="outline">
                <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
            <div className="col-span-1">
              <NavLink to="/signin">
                <Button variant="outline">Sign In</Button>
              </NavLink>
            </div>
            <div className="col-span-1">
              <NavLink to="/signup">
                <Button variant="outline">Sign Up</Button>
              </NavLink>
            </div>

          </div>
        </div>
      }


    </div>
  );
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NavBar;
