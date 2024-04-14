import { HttpClient } from "./http.client";

class GuestFetch extends HttpClient {
	constructor() {
		super(false);
	}
}

export const guestFetch = new GuestFetch();
