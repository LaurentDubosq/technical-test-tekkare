// This composable should be used to fetch any data for our app
export const useFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorMessage = `${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }
  } catch (error) {
    if (error instanceof TypeError) {
      console.log(
        "Network error: Please check your internet connection or the request URL."
      );
    } else {
      console.log("Error encountered after the Fetch execution :", error);
    }
  }
};

export const getData = async () => {
  const data = await useFetch(
    "https://laurentdubosq.github.io/technical-test-tekkare/assets/db.json" // This url should be replaced by an environment variable in not technical test situation
  );
  return data;
};
