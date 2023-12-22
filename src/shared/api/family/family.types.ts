export type Marriage = Readonly<{
  wife_id: number;
  husband_id: number;
  start_date?: Date;
  end_date?: Date;
}>;

export type Family = Readonly<{
  id: number;
  name: string;
}>;

export type Node = Readonly<{
  id: number; // references to Node(id)
  name: string;
  surname?: string;
  mother_id?: number;
  father_id?: number;
  patronymic?: string;
  avatar?: string;
  birthdate?: string;
  enddate?: string;
  addInfo?: string;
  photos?: string[];
}>;

export type Tree = Readonly<{
  family: Family;
  nodes: Node[];
  marriages: Marriage[];
} | null>;

export enum AccessLevels {
  availability,
  structure,
  names,
  main_photos,
  short_bio,
  full_bio,
  albums,
}
