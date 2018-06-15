import mongoose from 'mongoose'

const host = process.env.MONGODB_HOST || 'localhost'
const port = process.env.MONGODB_PORT || '27017'
const user = process.env.MONGODB_USER || ''
const pass = process.env.MONGODB_PASS || ''
const db = process.env.MONGODB_DB_NAME || 'my_db'

let credential = ''
if (user.length == 0 && pass.length == 0) {
    // NOP
} else if (user.length > 0 && pass.length > 0) {
    credential = user + ':' + pass + '@'
} else {
    throw new Error('Invalid modngdb user name or password')
}

let mongodbUri = process.env.MONGODB_URI
if (!mongodbUri) {
    mongodbUri = 'mongodb://' + credential + host + ':' + port + '/' + db
}

mongoose.connect(mongodbUri)

export default mongoose
