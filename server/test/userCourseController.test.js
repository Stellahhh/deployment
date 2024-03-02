// favoriteCoursesController.test.js

// Import the controller functions
const {
  getFavoriteCourses,
  addFavoriteCourse,
  deleteFavoriteCourse,
} = require("./../src/controllers/userCourseController");

// Mock the supabase object
const supabaseMock = {
  from: () => ({
    select: async () => ({
      data: [
        { user_id: 1, course_id: 1 },
        { user_id: 1, course_id: 2 },
      ],
      error: null,
    }),
    insert: async () => ({
      data: [{ user_id: 1, course_id: 3 }],
      error: null,
    }),
    delete: async () => ({
      data: null,
      error: null,
    }),
    eq: () => ({
      select: async () => ({
        data: [
          { user_id: 1, course_id: 1 },
          { user_id: 1, course_id: 2 },
        ],
        error: null,
      }),
      delete: async () => ({
        data: null,
        error: null,
      }),
    }),
  }),
};

// Mock the request and response objects
const req = { query: { user_id: 1, course_id: 1 } };
const res = {
  status: jest.fn(() => res),
  json: jest.fn((data) => data),
};

describe("getFavoriteCourses", () => {
  it("should fetch favorite courses", async () => {
    await getFavoriteCourses(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({
    //   status: "success",
    //   results: [
    //     { user_id: 1, course_id: 1 },
    //     { user_id: 1, course_id: 2 },
    //   ],
    // });
  });
});

describe("addFavoriteCourse", () => {
  it("should add a favorite course", async () => {
    await addFavoriteCourse(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    //     expect(res.json).toHaveBeenCalledWith({
    //       status: "success",
    //       results: [{ user_id: 1, course_id: 3 }],
    //     });
  });
});

describe("deleteFavoriteCourse", () => {
  it("should delete a favorite course", async () => {
    await deleteFavoriteCourse(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    //     expect(res.json).toHaveBeenCalledWith({
    //       status: "success",
    //       results: 1,
    //     });
  });
});
