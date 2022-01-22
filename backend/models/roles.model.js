import mongoose from 'mongoose'

const Roles = mongoose.Schema({
    role: {
        type:String
    }
    },
)
const Role = mongoose.model('Roles', Roles);

export default Role;