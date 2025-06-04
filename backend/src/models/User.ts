import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'tutor' | 'admin';
  profileData: {
    expertise?: string[];
    interests?: string[];
    grade?: number;
    subjects?: string[];
  };
  comparePassword(password: string): Promise<boolean>;
  generateToken(): string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['student', 'tutor', 'admin'] },
  profileData: {
    expertise: [String],
    interests: [String],
    grade: Number,
    subjects: [String]
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Generate JWT token
userSchema.methods.generateToken = function(): string {
  return jwt.sign(
    { id: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

export default mongoose.model<IUser>('User', userSchema);
