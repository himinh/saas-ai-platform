import { ErrorTypeEnum } from "~/enums/exception.enum";

const formatErrorMsg = (details: string[], errorType: string) => {
	const messages = details.map((message) => {
		const words = message.split(" ");

		const label = words[0];

		const msg = words.slice(1).join(" ");

		switch (errorType) {
			case ErrorTypeEnum.ValidationExceptions:
				return `<p><b>${label}</b>:  ${msg}</p>`;

			default:
				return message;
		}
	});

	return messages.join("\n");
};

export const handleError = (error: any) => {
	let errorType = error.name;
	let errorTitle = error.name;

	if (error.data) {
		errorType = error.data.type;
		errorTitle = error.data.title;
	}

	const errorMsg = error.data
		? formatErrorMsg(error.data.details, errorType)
		: error.errorMsg;

	return {
		title: errorTitle,
		errorMsg,
	};
};
