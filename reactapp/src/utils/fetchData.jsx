const fetchData = async (url, model_version) => {
	try {
		const response = await fetch("https://philainel.dipix.pw/api/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ url, model_version }),
		});
		const data = await response.json();
		console.log("Ответ сервера:", data);
		return data.result; // Return the data for further processing
	} catch (error) {
		console.error("Ошибка при отправке запроса:", error);
		return null; // Return null in case of an error
	}
};

export default fetchData;
