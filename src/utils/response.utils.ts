export default class ErrorHandler extends Error {
  status: number;

  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}
export const handleResponse = (
  status: number,
  message: string,
  data: any = null,
): {
  status: number;
  message: string;
  data: null;
} => {
  return { status, message, data };
};

export interface IResponse<T> {
  status: number;
  message: string;
  data: T | null;
}
