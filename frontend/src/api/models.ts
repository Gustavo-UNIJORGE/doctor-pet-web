export interface TaskForm {
  title: string;
  slug: string;
  specialty: string;
  estimated_time: string;
  is_it_home: boolean;
}
export interface Task {
  id: number;
  title: string;
  slug: string;
  specialty: string;
  estimated_time: string;
  is_it_home: boolean;
  is_active: boolean;
}
