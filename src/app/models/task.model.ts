export interface ITask {
  task: string;
  description: string;
  start_date: number;
  end_date: number;
  completed: boolean;
  status: string;
  assigned_by: string;
  assigned_to: string;
  uid?: string;
}