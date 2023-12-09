const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema(
  {
    level: String,
    message: String,
    meta: Object,
    timestamp:Date,
  },
  { timestamps: true, versionKey: false }
);


const LogModel = mongoose.model('Log', LogSchema);
const ErrorLogModel = mongoose.model(
    'ErrorLog',
    new mongoose.Schema(LogSchema.obj, { collection: 'error_logs',timestamps:true,versionKey:false })
  );
  

const saveLogToMongoDB = async (level, message, meta) => {
  try {
    let logModel;

    switch (level) {
      case 'info':
        logModel = LogModel;
        break;
      case 'error':
        logModel = ErrorLogModel;
        break;
    
      default:
        logModel = LogModel;
    }
    const logData = {
      level,
      message,
      meta,
      timestamp: new Date().toISOString(),
    };

    const log = new logModel(logData);
    await log.save();
  } catch (error) {
    console.error('Log save error', error);
  }
};

module.exports = { saveLogToMongoDB };
