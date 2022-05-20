export const parseStatusToDone = (status: number): boolean => (status === 10) || (status === 11);

export const parseStatusToEdited = (status: number): boolean => (status === 1) || (status === 11);

export const parseStatus = (done: boolean, edited: boolean) => Number(done && 10) + Number(edited && 1);
