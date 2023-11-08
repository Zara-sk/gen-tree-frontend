export type Node = Readonly<{
  id: number;
  mother_id?: number;
  father_id?: number;
  family_id: number;
  created_by_id: number;
}>;

export type Marriage = Readonly<{
  wife_id: number;
  husband_id: number;
  start_date: Date;
  end_date?: Date;
  created_by_id: number;
}>;

export type Family = Readonly<{
  id: number;
  name: string;
  created_by_id: number;
}>;

export type Person = Readonly<{
  id: number; // references to Node(id)
  name: string;
  surname?: string;
  patronymic?: string;
}>;

export type Tree = Readonly<{
  family: Family;
  nodes: Node[];
  marriages: Node[];
  persons: Person[];
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
