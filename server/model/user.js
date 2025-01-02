import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name: { type: String, required: true, sparse:true},
    email: { type: String, required: true, sparse:true},
    password : { type: String, required: true, sparse:true},
    id: { type: String, sparse:true}
})

export default mongoose.model("User", userSchema);

