export default {
    firstName:{
        required:{value:true,
                  message:"First name is required!"},
        minLength:{value:2,
                   message:"First name is too short!"},
        maxLength:{value:15,
                   message:"First name is too long!"}
    },
    lastName:{
        required:{value:true,
                  message:"Last name is required!"},
        minLength:{value:2,
                   message:"Last name is too short!"},
        maxLength:{value:15,
                   message:"Last name is too long!"}    
    },
    email:{
        required:{value:true,
                  message:"Email is required!"},
        minLength:{value:6,
                   message:"The email you entered is too short!"},
        maxLength:{value:45,
                   message:"The email you entered must contain less than 45 characters!"},
        Pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.source,
                 message:"Invalid email address"}
    },
    password:{
        required:{value:true,
            message:"Password required!"},
        minLength:{value:4,
             message:"The password must contain more than 4 characters!"},
        maxLength:{value:20,
             message:"The password must contain less than 20 characters!"}
    }
}