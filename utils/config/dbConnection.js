// import mongoose from "mongoose";

// const MONGO_URI = process.env.MONGO_URI;

// if (!MONGO_URI) {
//     throw new Error("Please define the mongodb connection string. Connection Failed!");
// };

// let cached = global.mongoose;

// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null }
// };

// async function dbConnect() {
//     if (cached.conn) {
//         return cached.conn;
//     }
//     if (!cached.promise) {
//         cached.promise = mongoose.connect(MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }).then((mongoose) => {
//             return mongoose;
//         })
//     }
//     cached.conn = await cached.promise;
//     return cached.conn;
// }

// export default dbConnect;

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ Please define the MongoDB connection string in .env. Connection failed!");
}

// Global cache to prevent multiple connections in development
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (process.env.NODE_ENV === "development") {
      console.log("📡 Connecting to MongoDB...");
    }

    cached.promise = mongoose.connect(MONGO_URI).then((mongooseInstance) => {
      if (process.env.NODE_ENV === "development") {
        console.log("✅ MongoDB connected");
      }
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
