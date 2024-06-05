const fetchData = async (url) => {
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      console.log("Ответ сервера:", data);
      return data; // Return the data for further processing
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      return null; // Return null in case of an error
    }
  };
  
  export default fetchData;
  