export enum ExceptionEnum {
	PageNotAccess = 403,
	PageNotFound = 404,
	ServerError = 500,
}

export enum ErrorTypeEnum {
	ValidationExceptions = "ValidationExceptions",
	ValidationError = "ValidationError",
	CastError = "CastError",
	InternalServerError = "InternalServerError",
}
