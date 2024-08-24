import mongoose, { model } from "mongoose";

const employeeSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    department : {
        type : String,
        required : true,
    },
    designation : {
        type : String,
        required : true,
    },

    salary : {
        type : String,
        required : true,
    },

    imageUrl : {
        type : String,
    }
} , {timestamps : true})


export const Employee = new model('Employee' , employeeSchema);
