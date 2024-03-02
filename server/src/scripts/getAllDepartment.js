const { supabase } = require("./../db/index");

const schools = [
  // "Bloomberg School of Public Health",
  // "Carey Business School",
  "Krieger School of Arts and Sciences",
  // "Krieger School of Arts and Sciences Advanced Academic Programs",
  // "Nitze School of Advanced International Studies",
  // "School of Education",
  // "School of Nursing",
  // "The Peabody Institute",
  "Whiting School of Engineering",
  // "Whiting School of Engineering Programs for Professionals",
  // "The Peabody Preparatory",
  // "Bloomberg School of Public Health Non-Credit",
  // "School of Medicine",
];

// Function to fetch data from external API
async function fetchDataFromExternalAPI() {
  let result = [{ DepartmentName: "All" }];
  for (let i = 0; i < schools.length; i++) {
    try {
      const response = await fetch(
        `https://sis.jhu.edu/api/classes/codes/departments/${schools[i]}?key=i4B6bhrwkCdmAf6y6aKT8SetSWbtWgWw`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data from external API");
      }
      const data = await response.json();
      const reduced = data.map(({ DepartmentName }) => ({
        DepartmentName: DepartmentName,
      }));
      result = [...result, ...reduced];
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  // Create a map to store unique objects based on the 'name' property
  const uniqueObjectsMap = new Map();
  result.forEach((obj) => {
    uniqueObjectsMap.set(obj.DepartmentName, obj);
  });

  // Convert the map values (unique objects) back to an array
  const uniqueDept = Array.from(uniqueObjectsMap.values());
  return uniqueDept;
}

// Function to store data in Supabase
async function storeDataInSupabase(data) {
  try {
    // Insert data into a specific table in your Supabase database
    const filteredData = data.map((obj) => ({ DepartmentName: obj.name }));

    const { data: insertedData, error } = await supabase
      .from("departments")
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
async function getAllDepartments() {
  const data = await fetchDataFromExternalAPI();
  if (data) {
    await storeDataInSupabase(data);
  }
}

getAllDepartments();
