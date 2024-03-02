import NavBar from "@/elements/NavBar";
import ViewCourseGuide from "@/elements/ViewCourseGuide";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReloadIcon } from "@radix-ui/react-icons";

import CourseCard from "@/elements/CourseCard";
import * as React from "react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Status = {
  value: string;
  label: string;
};

const Courses = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  );
  const [open2, setOpen2] = React.useState(false);
  const [selectedInstructor, setSelectedInstructor] =
    React.useState<Status | null>(null);
  const [courses, setCourses] = React.useState([]);
  const [courses2, setCourses2] = React.useState([]);
  const [instructors, setInstructors] = React.useState<Status[]>([]);
  const [departments, setDepartments] = React.useState<Status[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [counterIns, setCounterIns] = React.useState(0);
  const [counterDept, setCounterDept] = React.useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      setCourses([]);
      setCourses2([]);

      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/departments`
        );
        if (response.ok) {
          const data = await response.json();
          const refined = data.results.map(({ id, DepartmentName }) => ({
            value: DepartmentName,
            label: DepartmentName,
          }));

          setDepartments(refined);
        } else {
          throw new Error("Failed to fetch departments");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }

      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/instructors`
        );
        if (response.ok) {
          const data2 = await response.json();
          const refined2 = data2.results.map(({ id, InstructorName }) => ({
            value: InstructorName,
            label: InstructorName,
          }));

          setInstructors(refined2);
        } else {
          throw new Error("Failed to fetch instructors");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, []);

  useEffect(() => {
    const fetchCoursesUnderDepartment = async () => {
      setIsLoading(true);
      const dname = encodeURIComponent(selectedStatus?.label);
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/courses/dept?department=${dname}`
        );
        if (response.ok) {
          const data = await response.json();
          setCourses(data.results);
          setIsLoading(false);
        } else {
          throw new Error("Failed to fetch courses under given department");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchCoursesUnderDepartment();
  }, [counterDept]);

  useEffect(() => {
    const fetchCoursesUnderInstructor = async () => {
      //console.log(selectedStatus?.label);
      setIsLoading(true);
      const dname = encodeURIComponent(selectedInstructor?.label);
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/courses/inst?instructor=${dname}`
        );
        if (response.ok) {
          const data = await response.json();
          setCourses2(data.results);
          // console.log(data.results);
        } else {
          throw new Error("Failed to fetch courses under given department");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
      setIsLoading(false);
    };
    fetchCoursesUnderInstructor();
  }, [counterIns]);

  return (
    <>
      <NavBar />
      <ResizablePanelGroup
        direction="horizontal"
        className="max-h-[650px] min-w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={32}>
          <div className="mx-6 mt-6 max-w-96">
            <h4 className="mx-2 mb-7 text-start scroll-m-20 text-xl font-semibold tracking-tight">
              Filter
            </h4>
            <div className="mx-2 my-3 flex items-center space-x-4">
              <p className="text-sm text-muted-foreground">Department</p>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full min-h-12 text-left text-wrap justify-start"
                  >
                    {selectedStatus ? (
                      <>{selectedStatus.label}</>
                    ) : (
                      <>+ Select Department</>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                  <Command>
                    <CommandInput placeholder="Select school ..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {departments.map((status) => (
                          <CommandItem
                            key={status.value}
                            value={status.value}
                            onSelect={(value) => {
                              setSelectedStatus(
                                departments.find(
                                  (priority) =>
                                    priority.value.toLocaleLowerCase() ===
                                    value.toLocaleLowerCase()
                                ) || null
                              );

                              setIsLoading(true);
                              setSelectedInstructor(null);
                              setCounterDept(counterDept + 1);
                              setOpen(false);
                            }}
                          >
                            <div className="py-3">{status.label}</div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="mx-2 my-3 flex items-center space-x-4">
              <p className="text-sm text-muted-foreground">Instructor</p>
              <Popover open={open2} onOpenChange={setOpen2}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full min-h-12 text-left text-wrap justify-start"
                  >
                    {selectedInstructor ? (
                      <>{selectedInstructor.label}</>
                    ) : (
                      <>+ Select Instructor</>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                  <Command>
                    <CommandInput placeholder="Select instructor ..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {instructors.map((status) => (
                          <CommandItem
                            key={status.value}
                            value={status.value}
                            onSelect={(value) => {
                              setSelectedInstructor(
                                instructors.find(
                                  (priority) =>
                                    priority.value.toLocaleLowerCase() ===
                                    value.toLocaleLowerCase()
                                ) || null
                              );

                              setIsLoading(true);
                              setSelectedStatus(null);
                              setCounterIns(counterIns + 1);
                              setOpen2(false);
                            }}
                          >
                            <div className="py-3">{status.label}</div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle disabled />
        <ResizablePanel defaultSize={68}>
          <ScrollArea className="mt-3 h-[650px] w-[815px]">
            <div className="my-3 flex flex-col">
              {selectedInstructor === null && selectedStatus === null ? (
                <ViewCourseGuide />
              ) : selectedInstructor === null && selectedStatus != null ? (
                // Render list of courses
                <div>
                  {isLoading ? (
                    <div className="flex justify-center mt-60">
                      <div>
                        <ReloadIcon className="animate-spin h-5 w-5 mr-3" />
                      </div>
                      <div className="text-md font-semibold"> Loading ...</div>
                    </div>
                  ) : (
                    courses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))
                  )}
                </div>
              ) : (
                // Render list of courses 2
                <div>
                  {isLoading ? (
                    <div className="flex justify-center mt-60">
                      <div>
                        <ReloadIcon className="animate-spin h-5 w-5 mr-3" />
                      </div>
                      <div className="text-md font-semibold"> Loading ...</div>
                    </div>
                  ) : (
                    courses2.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default Courses;
