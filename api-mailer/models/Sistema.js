import mongoose from 'mongoose'

const SistemaSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: true,
		},

		url: {
			type: String,
			required: true,
		},

		status: {
			type: Boolean,
			default: true
		},

		accesos: {
			type: [String],
			default: []
		}
	},
	{ 
    timestamps: { 
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    } 
  }
)

const Sistema = mongoose.model('sistema', SistemaSchema, 'sistemas')

export default Sistema