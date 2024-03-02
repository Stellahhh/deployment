import NavBar from "@/elements/NavBar";
import { useLocation } from "react-router-dom";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { HeartIcon,HeartFilledIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { useState } from 'react';
import axios from 'axios';

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

interface CourseDetail {
    id: number;
    course_id: number;
    Term: string;
    InstructorsFullName: string;
    Description: string;
}

const CourseDetail: React.FC = () => {
    const location = useLocation();
    // easy to use: both unique course attribute and all courses attribute are passed in here
    const course: Course = location.state.course;
    const sections: CourseDetail[] = location.state.sections;
    const user_id: String = location.state.user_id;
    //const isFavorite: boolean= location.state.isFavorite;

    const [isFavorite, setIsFavorite] = useState(location.state.isFavorite);

    const handleFavoriteClick = async () => {
        try {
        
          if (isFavorite) {
           
            const response = await axios.delete(`http://localhost:8000/api/v1/favoriteCourse/?user_id=${user_id}&course_id=${course.id}`);
    
            // Remove the course from the favorites list
            setIsFavorite(false);
          } else {
       
              const response = await axios.post(`http://localhost:8000/api/v1/favoriteCourse/?user_id=${user_id}&course_id=${course.id}`)
              // Add the course to the favorites list
              setIsFavorite(true);
            
          }
        } catch (error) {
          console.error('Error handling favorite click:', error);
        }
      };

    let description = "";
    for (const section of sections) {
        if (section.Description !== "") {
            description = section.Description;
        }
    }

    return (
        <>
            <NavBar />
            <ResizablePanelGroup
                direction="horizontal"
                className="max-h-[650px] min-w-full rounded-lg border"
            >
                <ResizablePanel defaultSize={50}>
                    <ScrollArea className="h-[650px] w-full">
                        <div style={{ position: 'absolute', top: '0', right: '0' }}>
                            <Button variant="ghost" size="lg" className="ml-4" onClick={handleFavoriteClick}>
                                {isFavorite ? <HeartFilledIcon /> : <HeartIcon />}
                            </Button>
                        </div>
                        <div className="flex flex-row mb-3 justify-center pt-10 px-8">
                            <h4 className="scroll-m-20 text-lg font-semibold tracking-tight text-wrap px-3">
                                {course.Title}
                            </h4>
                        </div>
                        {description !== "" && (
                            <>
                                <Separator className="w-3/4 mx-auto my-4 border-t border-gray-300" />
                                    <div className="flex flex-row mb-1 justify-center px-16">
                                        <h4 className="scroll-m-20 text-sm font-light tracking-tight text-wrap pl-2">
                                            {sections.length > 0 && description}
                                        </h4>
                                    </div>
                            </>
                        )}
                    </ScrollArea>
                </ResizablePanel>
                <ResizableHandle disabled />
                <ResizablePanel defaultSize={50} style={{ position: 'relative' }} >
                </ResizablePanel>
            </ResizablePanelGroup>
        </>

    );
}

export default CourseDetail;