export interface ITask {
  task: string;
  module: string;
  description: string;
  start_date: string;
  end_date: string;
  completed: boolean;
  status: string;
  assigned_by: string;
  assigned_to: string;
  assigned_to_avatar: string;
  attachments: IFile[];
  comments: IComment[];
  uid?: string;
}

interface IFile {
  link: string;
  type: string;
}

interface IComment {
  comment: string;
  date: number;
  user_email: string;
  user_photo: string;
}
