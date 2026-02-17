/**
 * Extracts user-facing message from API/axios errors.
 * Backend errors typically return { message: string } in response.data.
 */
export const getApiErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const r = (error as { response?: { data?: { message?: string } } })
      .response;
    const msg = r?.data?.message;
    if (typeof msg === 'string') return msg;
  }
  return error instanceof Error ? error.message : 'Something went wrong';
};
