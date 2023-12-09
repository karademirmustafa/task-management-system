const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ROLES_LIST = require("../config/rolesList");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, trim: true },
    password: String,
    roles: {
      type: [{
        type: Number,
        enum: [ROLES_LIST.admin, ROLES_LIST.manager, ROLES_LIST.user],
        default: [ROLES_LIST.user],
      }],
      default: [ROLES_LIST.user],
    },
  },
  { timestamps: true, versionKey: false, collection: "users" }
);

// JWT token
UserSchema.methods.getSignedToken = function () {
  return jwt.sign(
    { id: this._id, roles: this.roles },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

UserSchema.pre(["updateOne", "findOneAndUpdate"], async function (next) {
  if (this._update.password) {
    const password = this._update.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      this.set("password", hash);
    }
  }
  next();
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
