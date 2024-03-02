import NavBar from "@/elements/NavBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchCourseList from "@/elements/search/SearchCourseList";
import SearchCourseDetail from "@/elements/search/SearchCourseDetail";

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

const Search = () => {
  const location = useLocation();
  let data = "";
  if (location.state) {
    data = encodeURIComponent(location.state.toString());
  }
  //data = encodeURIComponent(location.state.toString());
  const [courses, setCourses] = useState<Course[]>([]);

  // get course detail through the course title
  const [course, setCourse] = useState<Course>();
  //console.log("data is", courses);

  //console.log(data);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/courses/keyword?keyword=${data}`
        );

        if (response.ok) {
          const data = await response.json();
          setCourses(data.results);
          console.log(data.results)
        } else {
          throw new Error("Failed to fetch event");
        }
      } catch (error) {
        console.log("get here")
        console.error("Error fetching event:", error);
      }
    };
    fetchCourses();
  }, [data]);

  return (
    <>
      <NavBar />
      <ResizablePanelGroup
        direction="horizontal"
        className="max-h-[650px] min-w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={50}>
          <ScrollArea className="h-[650px] w-full">
            <div className="mx-1 my-3 flex flex-col">
              <SearchCourseList courseList={courses} setCourse={setCourse} />
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle disabled />
        <ResizablePanel defaultSize={50} style={{ position: "relative" }}>
          {course && <SearchCourseDetail course={course} />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default Search;
