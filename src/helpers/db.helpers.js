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

	const res = await fetch(ep, req);
	if (!res.ok) {
		return { status: res.status, error: `The request failed with: ${res.statusText}` };
	}

	const { data, error } = await res.json();
	if (error) {
		return { status: res.status, error };
	}
	console.log("---> image saved in the bucket under URL: ", data.url);
	return { url: data.url };
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
	const res = await fetch(ep, req);
	if (!res.ok) {
		return { status: res.status, error: `The request failed with: ${res.statusText}` };
	}

	const { data, error } = await res.json();
	if (error) {
		console.log({ error });
		return { error };
	}
	console.log("---> entity saved to the database under ID: ", data.id);
	return { id: data.id };
}

export async function getContextFromDatabase(contextId) {
	const ep = "http://localhost:3000/api/context";
	//const ep = "https://add-context-proxy.vercel.app/context";

	console.log("---> sending the request to the database for the id: ", contextId);
	let res = await fetch(`${ep}?id=${contextId}`);
	if (!res.ok) {
		return { status: res.status, error: `The request failed with: ${res.statusText}` };
	}
	const { data, error } = await res.json();
	if (error) {
		console.log({ error });
		return { error };
	}
	if (!data) {
		return null;
	}
	const imageUrl = data.imageUrl;
	console.log("---> sending the request to the storage for the image: ", imageUrl);
	res = await fetch(imageUrl);
	if (!res.ok) {
		return ({ status: res.status, error: `Error while downloading an image: ${res.statusText}` });
	}
	const blob = await res.blob();
	return { image: { blob }, text: data.text };
}

