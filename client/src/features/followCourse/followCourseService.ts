//for making http request
import axios,  { AxiosResponse } from 'axios'

const API_URL = 'http://localhost:8000/api/v1/followCourse'


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

interface AddFavoriteCourseResponse {
  // Define the type for the response data

}

interface GetFavoriteCoursesResponse {
  // Define the type for the response data
}

interface DeleteFavoriteCourseResponse {
  // Define the type for the response data
}


const addFavoriteCourse = async (user_id : string, course_id : string) => {
    
    const response = await axios.post(API_URL, null, { params: {
        user_id,
        course_id
      }})
  
    
    return response.data
}



 const getFavoriteCourses = async (user_id : string) => {
    
  //fetch(`http://localhost:8000/api/v1/courses/keyword?keyword=${data}`);
    const response = fetch(`${API_URL}/${user_id}`)

    const data: Course[] = await response.data;

    return response.data
}
  

const deleteFavoriteCourse = async (user_id: string, course_id: string) => {

    const response = await axios.delete(API_URL, null, { params: {
        user_id,
        course_id
      }})
  
    return response.data
}



