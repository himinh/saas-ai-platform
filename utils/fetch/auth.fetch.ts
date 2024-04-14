import { HttpClient } from "./http.client";

class AuthFetch extends HttpClient {
	constructor() {
		super(true);
	}
}

export const authFetch = new AuthFetch();
