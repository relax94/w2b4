import mongoose from 'mongoose'

const NetworkSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    public_id: mongoose.Schema.Types.ObjectId,
    creator_id : mongoose.Schema.Types.ObjectId,
    name: String,
    description: String

}, {collection : 'Network'});

export const Network = mongoose.model('Network', NetworkSchema);