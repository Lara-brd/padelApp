


export interface Teacher {
  name          : string;
  email         : string;
  gender        : string;
  image         : string;
  eventsTeacher : EventTeacher[]
}

export interface EventTeacher {
  id           : string;
  title        : string;
  allDay       : boolean;
  start?       : string;
  end?         : string;
  startDay?    : string;
  startTime?   : string;
  endDay?      : string;
  endTime?     : string;
  description ?: string;
  textColor?   : string;
  formatDate ? : string;
}
