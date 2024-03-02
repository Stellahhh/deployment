import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
interface SearchCourseCardProps {
  course: Course;
  setCourse: (value: Course) => void;
}

const SearchCourseCard: React.FC<SearchCourseCardProps> = ({ course, setCourse }) => {
    const handleClick = () => {
      setCourse(course);
    }

  return (
    <Button variant="outline" className="min-h-[120px] w-[580px] my-2 justify-start"
        onClick={handleClick}>
      <div className="flex flex-col items-start">
        <div className="mb-3">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight text-wrap text-left">
            {course.Title}
          </h4>
        </div>

        <div className="flex flex-row mb-3 items-start">
            <Badge key={0} className="mr-1" variant="secondary">
              {course.OfferingName}
            </Badge>
            <Badge key={1} className="mr-1" variant="secondary">
              {course.Department}
            </Badge>
            <Badge key={2} className="mr-1" variant="secondary">
              {course.Credits} Credit
            </Badge>
        </div>
      </div>
    </Button>
  );
};

export default SearchCourseCard;
