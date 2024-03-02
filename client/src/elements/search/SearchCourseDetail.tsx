import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRightIcon, HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from 'axios'

import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { User } from '@supabase/supabase-js'



// passed in course object with unique id
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

interface SearchCourseDetailProps {
  course: Course;
  //id: number;
}

// newly added for api call
interface CourseDetail {
  id: number;
  course_id: number;
  Term: string;
  InstructorsFullName: string;
  Description: string;
}


const SearchCourseDetail: React.FC<SearchCourseDetailProps> = ({ course }) => {
  const navigate = useNavigate();
  //TODO: tmp user id!! change later with actual user passed in
  //const user_id = "24792855-115b-4625-9f23-0aad5146f8d1"

  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  

  //const encodedTitle = encodeURIComponent(course.Title);
  const [sections, setSections] = useState<CourseDetail[]>([]);
  const [favoriteCourses, setFavoriteCourses] = useState<Course[]>([]);

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


    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/courses/id?id=${course.id}`);
        if (response.ok) {
          const data = await response.json();
          setSections(data.results);
        } else {
          throw new Error('Failed to fetch event');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    fetchCourses();
    
    const fetchFavoriteCourses = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/favoriteCourse/?user_id=${user?.id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data =  await response.json();
        setFavoriteCourses(data.results);
      
      } catch (error) {
        console.error('Error fetching favorite courses:', error);
       
      }
    };

    fetchFavoriteCourses();

    //return () => subscription.unsubscribe()

  }, [course.id]);



  const handleFavoriteClick = async () => {
    try {
    
      const isFavorite = favoriteCourses.some(favCourse => favCourse.id === course.id);

      if (isFavorite) {
       
        const response = await axios.delete(`http://localhost:8000/api/v1/favoriteCourse/?user_id=${user?.id}&course_id=${course.id}`);

        // Remove the course from the favorites list
        setFavoriteCourses(prev => prev.filter(favCourse => favCourse.id !== course.id));
      } else {
   
          const response = await axios.post(`http://localhost:8000/api/v1/favoriteCourse/?user_id=${user?.id}&course_id=${course.id}`)

          // Add the course to the favorites list
          setFavoriteCourses(prev => [...prev, course]);
         
        
      }
    } catch (error) {
      console.error('Error handling favorite click:', error);
    }
  };



  const terms: Set<string> = new Set();
  const instructors: Set<string> = new Set();
  let description = "";
  for (const section of sections) {
    if (section.Description !== "") {
      description = section.Description;
    }
  }

  const handleClick = () => {
    
    //sessionStorage.setItem("title", course.Title);
    //sessionStorage.setItem("description", description);
    const isFavorite = favoriteCourses.some(favCourse => favCourse.id === course.id);
    const user_id = user?.id
    navigate(`/search/${course.id}`, { state: { course, sections,isFavorite,  user_id} });
  }

  for (const section of sections) {
    terms.add(section.Term);
    instructors.add(section.InstructorsFullName);
  }

  const instructorsFormatted: Set<string> = new Set();
  for (const instructor of instructors) {
    const names = instructor.split(';').map(name => name.trim());
    for (const name of names) {
      const formattedName = name.split(',').map(name => name.trim()).reverse().join(' ');
      if (formattedName !== "Staff" && formattedName !== "staff") {
        instructorsFormatted.add(formattedName);
      }
    }
  }

  return (
    <>
      {sections &&
        (<>
          <div style={{ position: 'absolute', top: '0', right: '0' }}>
            <Button variant="ghost" size="lg" className="ml-4" onClick={handleFavoriteClick}>
              {favoriteCourses.some(favCourse => favCourse.id === course.id) ? (
                <HeartFilledIcon />
              ) : (
                <HeartIcon />
              )}
            </Button>
          </div>
          <div className="flex flex-row mb-3 justify-center pt-10 pl-4">
            <h4 className="scroll-m-20 text-lg font-semibold tracking-tight text-wrap px-3">
              {course.Title}
            </h4>
          </div>

          <div className="flex flex-row mb-1 justify-center">
            <h4 className="scroll-m-20 text-md font-light tracking-tight text-wrap">
              {course.OfferingName}  |
            </h4>
            <h4 className="scroll-m-20 text-md font-light tracking-tight text-wrap pl-2">
              {course.Department}
            </h4>
          </div>

          <div className="leading-8 items-center text-md" >
            <Badge key={3} className="mr-1" variant="secondary">
              {course.Level}
            </Badge>
            <Badge key={0} className="mr-1" variant="secondary">
              {course.Credits} Credit
            </Badge>
            {course.IsWritingIntensive && (
              <Badge key={1} className="mr-1" variant="secondary">
                Writing Intensive
              </Badge>
            )}
            {/* <Badge key={2} className="mr-1" variant="secondary">
              {course.MaxSeats} Seats
            </Badge> */}
          </div>
          {description !== "" && (
            <>
              <Separator className="w-3/4 mx-auto my-4 border-t border-gray-300" />
              <ScrollArea className="max-h-[150px] w-full overflow-y-auto">
              <div className="flex flex-row mb-1 justify-center px-16">
                <h4 className="scroll-m-20 text-sm font-light tracking-tight text-wrap pl-2">
                  {sections.length > 0 && description}
                </h4>
              </div>
              </ScrollArea>
            </>
          )}

          <Separator className="w-3/4 mx-auto my-4 border-t border-gray-300" />
          <div className="leading-8 py-2 text-md font-light" >
            past instructors <br />
            {Array.from(instructorsFormatted).map(instructor => (
              <Badge key={instructor} className="mr-1" variant="secondary">
                {instructor}
              </Badge>
            ))}
          </div>
          <div className="leading-8 py-3 items-left text-md font-light px-8">
            offered in <br />
            {Array.from(terms).map(term => (
              <Badge key={term} className="mr-2 " variant="secondary">
                {term}
              </Badge>
            ))}

          </div>

          <div style={{position: 'absolute', bottom: '0', right: '0', padding: '1rem'}}>
            <Button variant="ghost" size="lg" className="ml-4"
              onClick={handleClick}>
              Go to course
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </>
        )
      }
    </>
  );
}

export default SearchCourseDetail;