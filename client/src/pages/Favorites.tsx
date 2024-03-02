import NavBar from "@/elements/NavBar";
import FavoriteCourseCard from "../elements/favoriteCourse/FavoriteCourseCard"
import { Session } from "@supabase/supabase-js";
import { User } from '@supabase/supabase-js'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { supabase } from "../lib/supabase";

interface Course {
  id: number;
  Title: string;
  SchoolName: string;
  Level: string;
  Department: string;
  OfferingName: string;
  Credits: number;
  IsWritingIntensive: boolean;
}


const Favorites = () => {

  const [session, setSession] = useState<Session | null>(null);
  const [user_id, setUserId] = useState<String>("");



  const [courses, setCourses] = useState<Course[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    if (session == null) {
      setUserId("")
    } else {
      setUserId(session.user.id)
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
            setUserId(session.user.id)
          }
          break;
        case "SIGNED_OUT":
          setUserId("")
          break;
        default:
      }

    })

    
    const fetchFavoriteCourses = async () => {
      try {
        console.log(session?.user.id)
        const response = await fetch(`http://localhost:8000/api/v1/favoriteCourse/?user_id=${user_id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data =  await response.json();
        setCourses(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching favorite courses:', error);
      }
    };

    fetchFavoriteCourses();

    //return () => subscription.unsubscribe()


  }, []);

  const handleUnfavorite = async (courseId: number) => {
    try {
      // Make the API call to unfavorite the course
      // Update your backend API endpoint accordingly
      const response = await axios.delete(`http://localhost:8000/api/v1/favoriteCourse/?user_id=${user_id}&course_id=${courseId}`);

      // Handle the successful unfavorite on the frontend if needed
    } catch (error) {
      console.error('Error unfavoriting course:', error);
    }
  };
  
  
  return (
    <>
      <NavBar />
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">
        Favorited Courses
      </h2>
      {isLoading ? (
        <p>Loading Courses...</p>
      ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {courses.map((course) => (
              <FavoriteCourseCard key={course.id} course={course} onUnfavorite={handleUnfavorite} user_id={user_id} />
            ))}
          </div>
      )}
    </>
  );
};

export default Favorites;
