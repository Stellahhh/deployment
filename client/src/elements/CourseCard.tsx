import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const CourseCard = ({ course }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="min-h-[120px] w-[780px] my-2 mx-5 justify-start"
            // onClick={handleClickCard}
          >
            <div className="flex flex-col justify-start mx-3 ">
              <div className="mb-3">
                <h4 className="w-[750px] scroll-m-20 text-lg font-semibold tracking-tight text-wrap text-left">
                  {course.Title}
                </h4>
              </div>

              <div className="flex flex-row mb-3">
                <Badge className="mr-2" variant="secondary">
                  {course.Department}
                </Badge>
                <Badge className="mr-2" variant="secondary">
                  {course.OfferingName}
                </Badge>
                <Badge variant="secondary">{course.Credits} Credit</Badge>
              </div>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[825px] h-[600px]">
          <DialogHeader>
            <DialogTitle className="mt-5 mx-6">{course.Title}</DialogTitle>
            <DialogDescription className="mx-6">
              {course.OfferingName} | {course.Department}
            </DialogDescription>

            <div className="flex justify-center">
              <div className="mt-6 mb-3">
                {course.Description != null &&
                course.Description?.length != 0 ? (
                  <div className="text-left mx-6 mb-3 text-md font-semibold">
                    Course Description:
                  </div>
                ) : (
                  <div className="text-left mx-6 mb-3 text-md font-semibold">
                    No Description Available
                  </div>
                )}

                <ScrollArea className="h-[300px]">
                  <div className="mx-6">{course.Description}</div>
                </ScrollArea>
              </div>
            </div>
          </DialogHeader>

          <DialogFooter>
            <Button className="mx-6">Go to Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseCard;
