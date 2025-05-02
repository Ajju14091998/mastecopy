// api/fetchData.js

export const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  