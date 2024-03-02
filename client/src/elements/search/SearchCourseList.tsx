import SearchCourseCard from "./SearchCourseCard";


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

interface SearchCourseListProps {
    courseList: Course[];
    setCourse: (value: Course) => void;
}

const SearchCourseList: React.FC<SearchCourseListProps> = ({ courseList, setCourse }) => {
    return ( 
        <div>
            {courseList.map((course, index) => (
                <div key={index}>
                    <SearchCourseCard
                        course={course}
                        setCourse={setCourse}
                    />
                </div>
            ))}
        </div>
    );
}
 
export default SearchCourseList;
