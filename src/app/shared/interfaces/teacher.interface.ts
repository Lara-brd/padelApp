


export interface Teacher {
  name: string;
  email:string;
  gender:string;
  image: string;
  eventsTeacher :EventsTeacher[]
}

export interface EventsTeacher {
  id           : string;
  title        : string;
  allDay      : boolean;
  start?       : string;
  end?         : string;
  description ?: string;
  textColor?   :string;
}
