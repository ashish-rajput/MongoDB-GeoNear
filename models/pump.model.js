const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const autoIncrement = require('mongoose-sequence')(mongoose);

const validateEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const pumpSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: 'Email is required',
        trim: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    geo: {
        index: '2dsphere',
        type:[Number],
        default: [0, 0],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    fillingType: [{
        type: String,
        enum: ['petrol', 'diesel', 'cng']
    }],
    phone: {
        type: String,
        required: true,
    },
    bannerImage: {
        type: String,
        required: true
    },
    pumpImages: [String],
    isOpened: {
        type: Boolean,
        default: true
    },
    status: {
        type: Number,
        default: 0,
        enum: [0, 1], // 0: active 1: in-active
    }
}, {timestamps: true});

pumpSchema.plugin(autoIncrement, { inc_field: 'pId' });

const PUMP = model('Pumps', pumpSchema, 'Pumps');

module.exports = PUMP;
