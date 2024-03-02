import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import Features from "./pages/Features";
import Settings from "./pages/Settings";
import Resources from "./pages/Resources";
import Points from "./pages/Points";
import Favorites from "./pages/Favorites";
import Completed from "./pages/Completed";
import Search from "./pages/Search";
import CourseDetail from "./pages/CourseDetail";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

import { User } from '@supabase/supabase-js'
import { useState } from "react";
import { useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";



function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    if (session == null) {
      setUser(null)
    } else {
      setUser(session.user)
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      switch (_event) {
        case "SIGNED_IN":
          if (session != null) {
            console.log("signed in")
            setUser(session.user)
            console.log(user)
            console.log(session.user)
          }
          break;
        case "SIGNED_OUT":
          setUser(null);
          break;
        default:
      }

    })

    return () => subscription.unsubscribe()



  }, [])


  return (
    <>

      {session ? (
        <>

          <BrowserRouter>
            <Routes>

              <Route path="/" element={<Home />}></Route>
              {/* Under Home Tab */}
              <Route path="/about" element={<About />}></Route>
              <Route path="/features" element={<Features />}></Route>
              <Route path="/courses" element={<Courses />}></Route>
              <Route path="/signin" element={<SignInPage />}></Route>
              <Route path="/signup" element={<SignUpPage />}></Route>

              {/* Under My Tab */}
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/settings" element={<Settings />}></Route>
              <Route path="/resources" element={<Resources />}></Route>
              <Route path="/points" element={<Points />}></Route>
              <Route path="/fav-classes" element={<Favorites />}></Route>
              <Route path="/fav-classes/:id" element={<CourseDetail />}></Route>
          <Route path="/comp-classes" element={<Completed />}></Route>
              {/* Search */}
              <Route path="/search" element={<Search />}></Route>
              <Route path="/search/:id" element={<CourseDetail />}></Route>
            </Routes>
          </BrowserRouter>
        </>

      ) : (
        <>

          <BrowserRouter>
            <Routes>

              <Route path="/" element={<Home />}></Route>
              {/* Under Home Tab */}
              <Route path="/about" element={<About />}></Route>
              <Route path="/features" element={<Features />}></Route>
              <Route path="/courses" element={<Courses />}></Route>
              <Route path="/signin" element={<SignInPage />}></Route>
              <Route path="/signup" element={<SignUpPage />}></Route>
            </Routes>
          </BrowserRouter>
        </>
      )}

    </>

  );
}


export default App;
