const ViewCourseGuide = () => {
  return (
    <>
      <div className="mx-10 mt-12">
        <h2 className="text-left mx-5 scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
          How it works
        </h2>
        <p className="text-left mx-5 leading-7 [&:not(:first-child)]:mt-6">
          Start by selecting a department or a instructor. You should see all
          the courses that were once available during Fall 2019 - Spring 2024.
        </p>
        <p className="text-left mx-5 leading-7 [&:not(:first-child)]:mt-6">
          Seeing a list of courses, you can click on each course to view the
          details and then navigate to the Course Board.
        </p>
        <ul className="text-left mx-8 my-6 ml-6 list-disc [&>li]:mt-2">
          Note:
          <li className="mx-6">Search instructor by: Lastname, Firstname</li>
          <li className="mx-6">
            Department search and instructor search are independent.
          </li>
        </ul>
      </div>
    </>
  );
};

export default ViewCourseGuide;
