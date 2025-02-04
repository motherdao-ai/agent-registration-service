import { CustomError, ErrorResponse } from "./error";

type ErrorWithMessage = {
  message: string;
};

export function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

export function handleError(error: ErrorWithMessage): ErrorResponse {
  const isCustomError = error instanceof CustomError;
  const timestamp = new Date().toISOString();

  if (isCustomError) {
    return {
      error_code: error.errorCode,
      message: error.message,
      details: error.details,
      timestamp,
    };
  }
  return {
    error_code: "INTERNAL_SERVER_ERROR",
    message: error.message,
    timestamp,
  };
}
