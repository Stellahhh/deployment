const request = require("supertest");
const app = require("./../src/index");

describe("Get Instructor API", () => {
  it("GET /api/v1/instructors -> returns all instructors", () => {
    return request(app)
      .get("/api/v1/instructors")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.results).toHaveLength(2207);
      });
  });
});

describe("Get Department API", () => {
  it("GET /api/v1/departments -> returns all departments", () => {
    return request(app)
      .get("/api/v1/departments")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.results).toHaveLength(78);
      });
  });
});

describe("Get Course API by Keyword", () => {
  it("GET /api/v1/courses/keywords with valid keyword -> returns courses matching the keyword", () => {
    return request(app)
      .get("/api/v1/courses/keyword?keyword=data%20structure")
      .expect(200)
      .then((response) => {
        expect(response.body.results).toEqual([
          {
            Credits: 4,
            Department: "EN Computer Science",
            IsWritingIntensive: false,
            Level: "Lower Level Undergraduate",
            OfferingName: "EN.601.226",
            SchoolName: "Whiting School of Engineering",
            Title: "Data Structures",
            id: 942,
          },
        ]);
      });
  });

  it("GET /api/v1/courses/keywords with no keyword -> returns all courses", () => {
    return request(app).get("/api/v1/courses/keyword?keyword=").expect(404);
  });

  it("GET /api/v1/courses/keywords with empty string -> returns all courses", () => {
    return request(app).get("/api/v1/courses/keyword?keyword=").expect(404);
  });
});

describe("Get Course API by Department", () => {
  it("GET /api/v1/courses/dept with valid input -> returns courses matching the department", () => {
    return request(app)
      .get("/api/v1/courses/dept?department=EN%20Computer%20Science")
      .expect(200)
      .then((response) => {
        expect(response.body.results).toHaveLength(84);
      });
  }, 10000);
});

describe("Get Course API by Instructor", () => {
  it("GET /api/v1/courses/inst with valid input -> returns courses matching the instructor", () => {
    return request(app)
      .get("/api/v1/courses/inst?instructor=Madooei,%20Ali")
      .expect(200)
      .then((response) => {
        expect(response.body.results).toHaveLength(6);
      });
  }, 10000);

  it("GET /api/v1/courses/inst with no input -> returns courses matching the instructor", () => {
    return request(app).get("/api/v1/courses/inst?instructor=").expect(404);
  }, 10000);
});

describe("Get Course API by course id", () => {
  it("GET /api/v1/courses/id with valid input -> returns courses matching the instructor", () => {
    return request(app)
      .get("/api/v1/courses/id?id=1")
      .expect(200)
      .then((response) => {
        expect(response.body.results).toHaveLength(1);
      });
  }, 10000);
});

// describe("Get User's Favorite Courses", () => {
//   it("GET /api/v1/courses/id with valid input -> returns courses matching the instructor", () => {
//     return request(app)
//       .get("/api/v1/followCourse?user_id=64919590-cbdf-4b16-a770-4c219118652a")
//       .expect(200);
//   }, 10000);
// });
