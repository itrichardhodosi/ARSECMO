import mongoose from 'mongoose'

const APIRequestSchema = new mongoose.Schema(
	{
		sistema: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'sistema'
		},

		endpoint: {
			type: String,
			required: true,
		},

		ip: {
			type: String,
			required: true,
		},

		device_type: {
			type: String,
			required: true,
		},

		device_name: {
			type: String,
			required: true,
		},

		os: {
			type: String,
			required: true,
		},

		browser: {
			type: String,
			required: true,
		},

		country: {
			type: String,
			required: true,
		},
		
		region: {
			type: String,
			required: true,
		},

		success: {
			type: Boolean,
			required: true
		},
		comments: {
			type: String,
			required: true
		}
	},
	{ 
    timestamps: { 
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    } 
  }
)

const APIRequest = mongoose.model('api_request', APIRequestSchema, 'api_requests')

export default APIRequest