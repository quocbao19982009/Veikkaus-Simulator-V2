import { ApiErrorResponse } from "@/types/ErrorResponse.interfaces";
import { getTokenFromStorage } from "@/utils/localStorage";

export const getHeader = () => {
  const token = getTokenFromStorage();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const responseBody = (await response.json()) as ApiErrorResponse;

    if (responseBody.errors) {
      return Promise.reject(responseBody);
    }
  }

  return response.json();
};

export const getErrorMessage = (ApiErrorResponse: ApiErrorResponse) => {
  let combinedErrorMessage = "";

  for (const key in ApiErrorResponse.errors) {
    if (ApiErrorResponse.errors.hasOwnProperty(key)) {
      const errorMessages = ApiErrorResponse.errors[key];
      combinedErrorMessage += `${errorMessages.join(", ")}\n`;
    }
  }

  return combinedErrorMessage;
};
