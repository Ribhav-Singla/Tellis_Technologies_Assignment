import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description: string;
}

const TaskSchema = new Schema<ITask>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String }
}, {
  timestamps: true
});

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;
