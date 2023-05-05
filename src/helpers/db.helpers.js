export async function saveImageToBucket(image) {
	const ep = "http://localhost:3000/api/image";
	//const ep = "https://add-context-proxy.vercel.app/image";

	const formData = new FormData();
	formData.append("image-data", image.blob);
	formData.append("image-type", image.type);
	const req = {
		method: "POST",
		body: formData
	};
	console.log("---> sending the request to the bucket: ", req);

	const response = await fetch(ep, req);
	if (!response.ok) {
		return { status: response.status, imageUrlError: `The request failed with: ${response.statusText}` };
	}

	const { url, error } = await response.json();
	if (error) {
		return { status: response.status, error };
	}
	console.log("---> image saved in the bucket: ", url);
	return { url };
}

export async function saveContextToDatabase(imageUrl, text) {
	const entity = { imageUrl, text };

	const ep = "http://localhost:3000/api/context";
	//const ep = "https://add-context-proxy.vercel.app/context";

	const req = {
		method: "POST",
		body: JSON.stringify(entity)
	};
	console.log("---> sending the request to the database: ", req);

	const response = await fetch(ep, req);
	if (!response.ok) {
		return { status: response.status, error: `The request failed with: ${response.statusText}` };
	}

	const { data, error } = await response.json();
	if (error) {
		console.log({ error });
	}
	console.log("---> entity saved to the database: ", data.id);
	return { id: data.id };
}

