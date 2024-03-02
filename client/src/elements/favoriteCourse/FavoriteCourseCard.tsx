import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, HeartIcon, HeartFilledIcon} from "@radix-ui/react-icons";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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


interface FavoriteCourseCardProps {
  course: Course;
  onUnfavorite: (courseId: number) => Promise<void>;
  user_id:String;
}

const FavoriteCourseCard: React.FC<FavoriteCourseCardProps> = ({ course,onUnfavorite,user_id }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [sections, setSections] = useState<CourseDetail[]>([]);

  useEffect(() => {
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
  }, [course.id]);


  const navigate = useNavigate();

  const handleClick = () => {
    
    const isFavorite = true;
    //navigate(`/fav-classes/${course.id}`, {state: {course,}});
    navigate(`/search/${course.id}`, { state: { course, sections, isFavorite, user_id } });
  }

  const handleToggleFavorite = async () => {
    try {
      // Make API call to unfavorite the course
      await onUnfavorite(course.id);
      
      // If the API call is successful, hide the component
      setIsVisible(false);
    } catch (error) {
      console.error('Error unfavoriting course:', error);
    }
  };

  if (!isVisible) {
    return null; // Don't render anything if not visible
  }


  return (
    <Card className="relative p-4 mb-4 w-full">
      <div style={{ position: 'absolute', top: '0', right: '0' }}>
        <Button variant="ghost" size="lg" className="mt-2 mr-2" onClick={handleToggleFavorite}>
           <HeartFilledIcon fill="red" />
        </Button>
      </div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{course.Title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full">
        <div className="flex flex-row mb-3 items-start">
          <Badge key={0} className="mr-1" variant="secondary">
            {course.OfferingName}
          </Badge>
          <Badge className="mr-1" variant="secondary">
            {course.Department}
          </Badge>
          <Badge key={2} className="mr-1" variant="secondary">
            {course.Credits} Credit
          </Badge>
        </div>
        <div style={{ position: 'absolute', bottom: '0', right: '0', padding: '1rem' }}>
          <Button variant="ghost" size="lg" className="ml-4" onClick={handleClick}>
            Go to course
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteCourseCard;