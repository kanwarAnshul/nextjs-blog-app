import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema(
  {
    adminName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin'], default: 'admin' }, 
    permissions: {
      canApproveUsers: { type: Boolean, default: true },
      canDeleteBlogs: { type: Boolean, default: true },
      canEditBlogs: { type: Boolean, default: true },
      canManageApprovedAdmins: { type: Boolean, default: true },
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

adminSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'admin',
})

adminSchema.virtual('blogs', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'admin',
})

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema)
export default Admin
