export type Status = 'waiting' | 'finished' | 'started';
export type setStatusType = React.Dispatch<React.SetStateAction<Status>>;
export type StatusContextType = {
  status: Status,
  setStatus: setStatusType
};
