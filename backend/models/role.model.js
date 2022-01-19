import mongoose from 'mongoose';

const RoleSchema = mongoose.Schema({
  roles: String,
});

const Role = mongoose.model('Role', RoleSchema)

export default Role;
