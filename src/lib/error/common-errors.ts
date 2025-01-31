import { CustomError } from "./error";

export function BadRequestError(
  message: string,
  details?: Record<string, unknown>
) {
  return new CustomError(message, 400, "BAD_REQUEST", details);
}

export function UnauthorizedError(
  message: string,
  details?: Record<string, unknown>
) {
  return new CustomError(message, 401, "UNAUTHORIZED", details);
}

export function InternalServerError(
  message: string,
  details?: Record<string, unknown>
) {
  return new CustomError(message, 500, "INTERNAL_SERVER_ERROR", details);
}
