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
  // let result = [];
  // for (let t = 0; t < terms.length; t++) {
  //   for (let i = 0; i < schools.length; i++) {
  //     try {
  //       const response = await fetch(
  //         `https://sis.jhu.edu/api/classes/${schools[i]}/${terms[t]}?key=i4B6bhrwkCdmAf6y6aKT8SetSWbtWgWw`
  //       );
  //       if (!response.ok) {
  //         throw new Error(
  //           `Failed to fetch data from external API for ${schools[i]} and ${terms[t]}`
  //         );
  //       }
  //       const data = await response.json();
  //       const reduced = data.map(
  //         ({ InstructorsFullName, MaxSeats, Credits, Level }) => ({
  //           InstructorsFullName,
  //           MaxSeats,
  //           Credits,
  //           Level,
  //         })
  //       );
  //       result = [...result, ...reduced];
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       return null;
  //     }
  //   }
  // }

  // // Create a map to store unique objects based on the 'name' property
  // const uniqueObjectsMap = new Map();
  // result.forEach((obj) => {
  //   if (obj.MaxSeats === "N/A") {
  //     obj.MaxSeats = -1;
  //   }
  //   if (obj.Credits.length > 4) {
  //     obj.Credits = -1.0;
  //   }

  //   if (
  //     obj.Level === "Lower Level Undergraduate" ||
  //     obj.Level === "Upper Level Undergraduate"
  //   ) {
  //     const arr = obj.InstructorsFullName.split(";");
  //     for (let i = 0; i < arr.length; i++) {
  //       uniqueObjectsMap.set(arr[i], { InstructorName: arr[i] });
  //     }
  //   }
  // });

  // // Convert the map values (unique objects) back to an array
  // const uniqueCourse = Array.from(uniqueObjectsMap.values());
  // return uniqueCourse;
  // //   return result;
  try {
    let { data: instructors, error } = await supabase
      .from("allCourses")
      .select("InstructorsFullName");

    const uniqueObjectsMap = new Map();
    instructors.forEach((obj) => {
      // const key = obj.InstructorsFullName;
      const arr = obj.InstructorsFullName.split(";");
      for (let i = 0; i < arr.length; i++) {
        uniqueObjectsMap.set(arr[i].toLowerCase().trim(), {
          InstructorName: arr[i].trim(),
        });
      }

      // uniqueObjectsMap.set(key, obj);
    });

    // Convert the map values (unique objects) back to an array
    const uniqueCourse = Array.from(uniqueObjectsMap.values());

    // res.status(200).json({
    //   status: "success",
    //   results: uniqueCourse,
    // });
    return uniqueCourse;
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}

// Function to store data in Supabase
async function storeDataInSupabase(data) {
  try {
    // Insert data into a specific table in your Supabase database
    const { data: insertedData, error } = await supabase
      .from("instructors2")
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
  if (data) {
    await storeDataInSupabase(data);
  }
}

getCourses();
