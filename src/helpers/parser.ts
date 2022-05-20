export const parseStatusToDone = (status: number): boolean => {
  return (status === 10) || (status === 11);
}

export const parseStatusToEdited = (status: number): boolean => {
  return (status === 1) || (status === 11);
}

export const parseStatus = (done: boolean, edited: boolean) => {
  return Number(done && 10) + Number(edited && 1);
}