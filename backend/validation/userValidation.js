import joi from "joi"

const userValidation = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().min(8).required(),
    userName: joi.string().required(),
    profileImage: joi.string(),
    coverImage: joi.string(),
    gender: joi.string(),
    phone: joi.string(),
    bio: joi.string(),
    location: joi.string(),
    skills: joi.array(),
    education: joi.array(),
    experience: joi.array(),
    network: joi.array(),
});

export default userValidation;