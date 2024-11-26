const connectionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    connectedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Connection = mongoose.model('Connection', connectionSchema);
