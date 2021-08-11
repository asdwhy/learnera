const crypto = require('crypto') // crypto comes with Node.js

module.exports.generateSignature = function generateSignature(apiKey, apiSecret, meetingNumber, role) {

  // Prevent time sync issue between client signature generation and zoom 
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
  const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
  const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

  return signature
}