import type { Endpoint } from "~/types/endpoint.type";
import { authFetch } from "~/utils/fetch";
import type { PaginateResponse } from "../types/paginate-reponse.type";
import type { PaginationParams } from "../utils/fetch/types";

const endpointGroupUrl = "/endpoint_groups";

export const endpointApi = {
	getAll: (query?: PaginationParams): Promise<Endpoint[]> => {
		return authFetch.get(`${endpointGroupUrl}`, query);
	},

	getById: (id: string, query?: PaginationParams): Promise<Endpoint> => {
		return authFetch.get(`${endpointGroupUrl}/${id}`, query);
	},

	create: (body: Endpoint): Promise<Endpoint> => {
		return authFetch.post(`${endpointGroupUrl}`, body);
	},

	updateById: (id: string, body: Endpoint): Promise<Endpoint> => {
		return authFetch.patch(`${endpointGroupUrl}/${id}`, body);
	},

	deleteById: (id: string): Promise<Endpoint> => {
		return authFetch.delete(`/${`${endpointGroupUrl}`}/${id}`);
	},

	paginate: (query?: PaginationParams): Promise<PaginateResponse<Endpoint>> => {
		return authFetch.get(`${endpointGroupUrl}/paginate`, query);
	},
};
