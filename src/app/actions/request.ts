export const PAGINATABLE_REQUEST_START = 'PAGINATABLE_REQUEST_START';
export const PAGINATABLE_REQUEST_MIDDLE = 'PAGINATABLE_REQUEST_MIDDLE ';

export const paginatableRequestStart = (payload: any) => ({
  type: PAGINATABLE_REQUEST_START,
  payload
});

export const paginatableRequestMiddle = (payload: any) => ({
  type: PAGINATABLE_REQUEST_MIDDLE,
  payload
});
