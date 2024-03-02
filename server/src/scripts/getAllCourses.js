const { supabase } = require("./../db/index");

const schools = [
  //   "Bloomberg School of Public Health",
  //   "Carey Business School",
  "Krieger School of Arts and Sciences",
  //   "Krieger School of Arts and Sciences Advanced Academic Programs",
  //   "Nitze School of Advanced International Studies",
  //   "School of Education",
  //   "School of Nursing",
  //   "The Peabody Institute",
  "Whiting School of Engineering",
  //   "Bloomberg School of Public Health Non-Credit",
  //   "School of Medicine",
];

const terms = [
  "Fall 2019",
  "Spring 2020",
  "Fall 2020",
  "Spring 2021",
  "Fall 2021",
  "Spring 2022",
  "Fall 2022",
  "Spring 2023",
  "Fall 2023",
  "Spring 2024",
];

// Function to fetch data from external API
async function fetchDataFromExternalAPI() {
  let result = [];
  for (let t = 0; t < terms.length; t++) {
    console.log(`Starting ${terms[t]}`);
    for (let i = 0; i < schools.length; i++) {
      try {
        const response = await fetch(
          `https://sis.jhu.edu/api/classes/${schools[i]}/${terms[t]}?key=i4B6bhrwkCdmAf6y6aKT8SetSWbtWgWw`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data from external API for ${schools[i]} and ${terms[t]}`
          );
        }
        const data = await response.json();
        const reduced = data.map(({ Title, Term, InstructorsFullName }) => ({
          Title,
          Term,
          InstructorsFullName,
        }));
        result = [...result, ...reduced];
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    }
    console.log(`${terms[t]} DONE`);
  }

  // Create a map to store unique objects based on the 'name' property
  const uniqueObjectsMap = new Map();
  result.forEach((obj) => {
    const key = obj.Title + obj.Term + obj.InstructorsFullName;

    uniqueObjectsMap.set(key, obj);
  });

  // Convert the map values (unique objects) back to an array
  const uniqueCourse = Array.from(uniqueObjectsMap.values());
  let finalCourseArray = [];

  // add course_id and description to this document AND delete Title
  for (let i = 0; i < uniqueCourse.length; i++) {
    let newCourse = uniqueCourse[i];
    let { data, error } = await supabase
      .from("uniqueCourses")
      .select("*")
      .eq("Title", uniqueCourse[i].Title);

    //console.log(data);

    if (data.length !== 0) {
      newCourse.course_id = data[0].id; // insert id
      const offeringname = data[0].OfferingName.replace(/\./g, "") + "01";
      const term = uniqueCourse[i].Term;

      //console.log(newCourse);
      try {
        // get course detail
        const response = await fetch(
          `https://sis.jhu.edu/api/classes/${offeringname}/${term}?key=i4B6bhrwkCdmAf6y6aKT8SetSWbtWgWw`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data from external API for ${offeringname} in ${term}`
          );
        }
        const resdata = await response.json();
        //console.log(resdata[0].SectionDetails[0].Description);
        const desc =
          resdata.length === 0 ? "" : resdata[0].SectionDetails[0].Description;
        newCourse.Description = desc; // insert description
      } catch (error) {
        console.error(
          `Error to fetch data for ${offeringname} in ${term}`,
          error
        );
        return null;
      }
      delete newCourse.Title; // delete Title
      finalCourseArray = [...finalCourseArray, newCourse]; // add course to new array
    }
  }
  return finalCourseArray;
}

// Function to store data in Supabase
async function storeDataInSupabase(data) {
  try {
    // Insert data into a specific table in your Supabase database
    const { data: insertedData, error } = await supabase
      .from("allCourses")
      .insert(data);

    if (error) {
      throw error;
    }

    console.log("Data inserted successfully:", insertedData);
  } catch (error) {
    console.error("Error inserting data into Supabase:", error.message);
  }
}

// Main function to fetch data from external API and store in Supabase
async function getCourses() {
  const data = await fetchDataFromExternalAPI();
  //console.log(data);
  if (data) {
    await storeDataInSupabase(data);
  }
}

getCourses();
