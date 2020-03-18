import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    require: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    require: true
  },
  registerDate: {
    type: Date,
    require: true,
  },
  modifyDate: {
    type: Date,
    require: true,
  },

});

export const UserModel = mongoose.model('User', UserSchema);