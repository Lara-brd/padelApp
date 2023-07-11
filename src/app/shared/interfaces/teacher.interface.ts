


export interface Teacher {
  name          : string;
  email         : string;
  gender        : string;
  image         : string;
  alt           : string;
  eventsTeacher : EventTeacher[]
}

export interface EventTeacher {
  id           : string;
  title        : string;
  allDay       : boolean;
  start        : string;
  end?         : string;
  description? : string;
}


export interface MyCard {
  text:string;
  img:string;
}
