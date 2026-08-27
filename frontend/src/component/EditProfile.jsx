import { IoMdCloseCircle } from "react-icons/io";
import { FiCamera } from "react-icons/fi";
import profile from "../assets/profile.png";
import { TiPlus } from "react-icons/ti";
import { useState, useContext, useRef } from "react";
import { UserContext } from '../context/UserContext';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const EditProfile = () => {
    const { user, setUser, editProfile, setEditProfile } = useContext(UserContext);
    const { serverUrl } = useContext(AuthContext);
    const profileImage = useRef(user.profileImage || profile);
    const coverImage = useRef(user.coverImage || null);
    const [loading, setLoading] = useState(false);

    const [profileData, setProfileData] = useState({
        profileImage: user.profileImage || profile,
        coverImage: user.coverImage || null,
        frontProfileImage: user.profileImage || profile,
        frontCoverImage: user.coverImage || null,
        firstName: user.firstName,
        lastName: user.lastName,
        headline: user.headline,
        location: user.location,
        gender: user.gender,
        skills: user.skills || [],
        newSkill: "",
        education: user.education || [],
        newEducation: {
            school: "",
            degree: "",
            fieldOfStudy: "",
        },
        experience: user.experience || [],
        newExperience: {
            title: "",
            company: "",
            description: ""
        },
    });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSkills = (e) => {
        e.preventDefault();
        setProfileData((prevData) => ({ ...prevData, skills: [...prevData.skills, profileData.newSkill], newSkill: "" }))
    }
    const removeSkill = (index) => {
        setProfileData((prevData) => ({
            ...prevData,
            skills: prevData.skills.filter((_, i) => i !== index),
        }));
    }
    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            newEducation: {
                ...prevData.newEducation,
                [name]: value,
            },
        }));
    };
    const removeEducation = (index) => {
        setProfileData((prevData) => ({
            ...prevData,
            education: prevData.education.filter((_, i) => i !== index),
        }));
    };
    const handleEducation = (e) => {
        e.preventDefault();
        setProfileData((prevData) => ({
            ...prevData,
            education: [...prevData.education, profileData.newEducation],
            newEducation: {
                school: "",
                degree: "",
                fieldOfStudy: "",
            }
        }))
    }
    const handleExperienceChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            newExperience: {
                ...prevData.newExperience,
                [name]: value,
            },
        }));
    }
    const handleExperience = (e) => {
        e.preventDefault();
        setProfileData((prevData) => ({
            ...prevData,
            experience: [...prevData.experience, prevData.newExperience],
            newExperience: {
                title: "",
                company: "",
                description: ""
            }
        }))
    }
    const removeExperience = (index) => {
        setProfileData((prevData) => ({
            ...prevData,
            experience: prevData.experience.filter((_, i) => i !== index),
        }));
    }
    const handleImage = (e) => {

        const { name, files } = e.target;
        const file = files[0];
        setProfileData((prevData) => ({
            ...prevData,
            [name]: file,
        }));
        if (name === 'profileImage') {
            setProfileData((prevData) => ({ ...prevData, frontProfileImage: URL.createObjectURL(file) }));
        } else if (name === 'coverImage') {
            setProfileData((prevData) => ({ ...prevData, frontCoverImage: URL.createObjectURL(file) }));
        }
    }
    const handleSave = async () => {
        setLoading(true);
        let formData = new FormData();
        formData.append("profileImage", profileData.profileImage);
        formData.append("coverImage", profileData.coverImage);
        formData.append("firstName", profileData.firstName);
        formData.append("lastName", profileData.lastName);
        formData.append("headline", profileData.headline);
        formData.append("location", profileData.location);
        formData.append("gender", profileData.gender);
        formData.append("skills", JSON.stringify(profileData.skills));
        formData.append("education", JSON.stringify(profileData.education));
        formData.append("experience", JSON.stringify(profileData.experience));

        const result = await axios.put(`${serverUrl}/api/v1/user/updateProfile`, formData, { withCredentials: true });
        if (result.status === 200) {
            setLoading(false);
            setUser(result.data.user);
            setProfileData({
                ...result.data.user,
                frontProfileImage: result.data.user.profileImage || profile,
                frontCoverImage: result.data.user.coverImage || null,
                newEducation: {
                    school: "",
                    degree: "",
                    fieldOfStudy: "",
                },
                newExperience: {
                    title: "",
                    company: "",
                    description: ""
                }
            });
            setEditProfile(false);
        }
        setLoading(false);
    }

    return (
        <div className='w-full h-screen fixed top-0 left-0 bg-black/50 z-10 flex items-center justify-center'>
            <div className='w-[95%] sm:w-[85%] md:w-[60%] lg:w-[40%] h-[90%] md:h-[80%] bg-white rounded-lg overflow-y-auto overflow-x-hidden'>
                <div className='flex items-center justify-between mx-5 my-5'>
                    <p className='text-xl font-medium'>Edit Your Profile</p>
                    <button className='text-xl font-medium cursor-pointer' onClick={() => setEditProfile(false)}><IoMdCloseCircle /></button>
                </div>
                <div className='w-full h-1 bg-gray-400 mb-10'></div>
                <input type="file" name="profileImage" accept="image/*" ref={profileImage}
                    hidden onChange={handleImage} />
                <input type="file" name="coverImage" accept="image/*" ref={coverImage}
                    hidden onChange={handleImage} />
                <div className='relative m-5'>
                    {profileData.frontCoverImage ? (
                        <img src={profileData.frontCoverImage} alt="cover"
                            className='w-full h-30 rounded-lg cursor-pointer hover:text-gray-900 object-cover' onClick={() => coverImage.current.click()} />
                    ) : (
                        <div className='bg-gray-400 w-full h-30 rounded-lg cursor-pointer' onClick={() => coverImage.current.click()}></div>
                    )}
                    <FiCamera className='absolute top-3 right-3 w-8 h-8 text-white cursor-pointer' onClick={() => coverImage.current.click()} />
                    <div className='flex flex-col absolute top-[80px] left-10' onClick={() => profileImage.current.click()}>
                        <img src={profileData.frontProfileImage || profile} alt="profile"
                            className='w-15 h-15 rounded-full cursor-pointer hover:text-gray-900 object-cover' />
                        <div className='absolute top-8 right-0 w-5 h-5 bg-blue-600 rounded-full cursor-pointer hover:text-gray-900 flex items-center justify-center' > <TiPlus className='text-white' /></div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-5 justify-center items-center">
                    <input type="text" placeholder='Headline'
                        name="headline" className='w-[90%] h-10 outline-none border-2
                      border-gray-400 rounded-lg px-5 py-2 text-lg font-medium
                       text-gray-600 cursor-pointer hover:text-gray-900'
                        value={profileData.headline} onChange={handleProfileChange} />
                    <input type="text" placeholder='First Name'
                        name="firstName" className='w-[90%] h-10 outline-none border-2
                      border-gray-400 rounded-lg px-5 py-2 text-lg font-medium
                       text-gray-600 cursor-pointer hover:text-gray-900'  value={profileData.firstName} onChange={handleProfileChange} />
                    <input type="text" placeholder='Last Name'
                        name="lastName" className='w-[90%] h-10 outline-none border-2
                      border-gray-400 rounded-lg px-5 py-2 text-lg font-medium
                       text-gray-600 cursor-pointer hover:text-gray-900'  value={profileData.lastName} onChange={handleProfileChange} />
                    <input type="text" placeholder='Location'
                        name="location" className='w-[90%] h-10 outline-none border-2
                      border-gray-400 rounded-lg px-5 py-2 text-lg font-medium
                       text-gray-600 cursor-pointer hover:text-gray-900'  value={profileData.location} onChange={handleProfileChange} />
                    <div className="w-[90%] flex flex-wrap gap-3 items-center border-2 border-gray-400 rounded-lg px-5 py-2 text-lg font-medium text-gray-600 cursor-pointer hover:text-gray-900" >
                        <p className="font-semibold mr-2">Gender</p>
                        <div className="flex gap-2 items-center">
                            <input type="radio" name="gender" id="gender_male" value="male" checked={profileData.gender?.toLowerCase() === "male"} onChange={handleProfileChange} />
                            <label htmlFor="gender_male" className="cursor-pointer">Male</label>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="radio" name="gender" id="gender_female" value="female" checked={profileData.gender?.toLowerCase() === "female"} onChange={handleProfileChange} />
                            <label htmlFor="gender_female" className="cursor-pointer">Female</label>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="radio" name="gender" id="gender_other" value="other" checked={profileData.gender?.toLowerCase() === "other"} onChange={handleProfileChange} />
                            <label htmlFor="gender_other" className="cursor-pointer">Other</label>
                        </div>
                    </div>
                    <div className="w-[90%] flex flex-col gap-2 border-2 border-gray-400 rounded-lg px-5 py-2">
                        <h4 className="text-lg font-medium text-gray-700">Skills</h4>
                        {profileData.skills && (
                            <div className='flex gap-2' >
                                {profileData.skills.map((skill, index) => (
                                    <span key={index} className='inline-block bg-gray-400 rounded-lg
                                     px-2 py-1 text-lg font-medium text-gray-600 cursor-pointer
                                      hover:text-gray-900' >{skill}  <button className='text-xl 
                                      font-medium cursor-pointer' onClick={() => removeSkill(index)}><IoMdCloseCircle />
                                        </button></span>
                                ))}
                            </div>
                        )}
                        <div className="w-full flex gap-2" >
                            <input type="text" placeholder='Skill' name="newSkill" className='flex-grow h-10 outline-none border-2
                      border-gray-400 rounded-lg px-5 py-2 text-lg font-medium
                       text-gray-600 cursor-pointer hover:text-gray-900' value={profileData.newSkill} onChange={handleProfileChange} />
                            <button className='w-[30%] sm:w-[20%] h-10 outline-none border-2
                      border-gray-400 rounded-lg px-2 py-2 text-lg font-medium bg-gray-400
                       text-gray-600 cursor-pointer hover:text-gray-900' onClick={handleSkills}>Add</button>
                        </div>
                    </div>
                    <div className="w-[90%] flex flex-col gap-2 border-2 border-gray-400 rounded-lg px-5 py-2">
                        <h4 className="text-lg font-medium text-gray-700">Education</h4>
                        {profileData.education && profileData.education.length > 0 && (
                            <div className='flex flex-wrap gap-2' >
                                {profileData.education.map((edu, index) => (
                                    <div key={index} className='relative bg-gray-400 rounded-lg
                                     px-2 py-1 pr-8 text-lg font-medium text-gray-600 cursor-pointer
                                      hover:text-gray-900' >
                                        <div>School: {edu.school}</div>
                                        <div>Degree: {edu.degree}</div>
                                        <div>Field Of Study: {edu.fieldOfStudy}</div>
                                        <button className='absolute top-1 right-1 text-xl font-medium cursor-pointer' onClick={() => removeEducation(index)}>
                                            <IoMdCloseCircle />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="w-full flex flex-col gap-4" >
                            <input type="text" placeholder='School Name' name="school" className='flex-grow h-10 outline-none border-2
                                border-gray-400 rounded-lg px-5 py-2 text-lg font-medium
                                text-gray-600 cursor-pointer hover:text-gray-900' value={profileData.newEducation.school} onChange={handleEducationChange} />
                            <input type="text" placeholder='Degree' name="degree" className='flex-grow h-10 outline-none border-2 border-gray-400 rounded-lg px-5 py-2 text-lg font-medium text-gray-600 cursor-pointer hover:text-gray-900'
                                value={profileData.newEducation.degree}
                                onChange={handleEducationChange} />
                            <input type="text" placeholder='Field Of Study' name="fieldOfStudy" className='flex-grow h-10 outline-none border-2
                                border-gray-400 rounded-lg px-5 py-2 text-lg font-medium
                                text-gray-600 cursor-pointer hover:text-gray-900' value={profileData.newEducation.fieldOfStudy} onChange={handleEducationChange} />
                            <button className='w-full sm:w-[20%] h-10 outline-none border-2
                                border-gray-400 rounded-lg px-2 py-2 text-lg font-medium bg-gray-400
                                text-gray-600 cursor-pointer hover:text-gray-900' onClick={handleEducation}>Add</button>
                        </div>
                    </div>

                    <div className="w-[90%] flex flex-col gap-2 border-2 border-gray-400 rounded-lg px-5 py-2">
                        <h4 className="text-lg font-medium text-gray-700">Experience</h4>
                        {profileData.experience && profileData.experience.length > 0 && (
                            <div className='flex flex-wrap gap-2' >
                                {profileData.experience.map((exp, index) => (
                                    <div key={index} className='relative bg-gray-400 rounded-lg
                                     px-2 py-1 pr-8 text-lg font-medium text-gray-600 cursor-pointer
                                      hover:text-gray-900' >
                                        <div>Title: {exp.title}</div>
                                        <div>Company: {exp.company}</div>
                                        <div>Description: {exp.description}</div>
                                        <button className='absolute top-1 right-1 text-xl font-medium cursor-pointer' onClick={() => removeExperience(index)}>
                                            <IoMdCloseCircle />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="w-full flex flex-col gap-4" >
                            <input type="text" placeholder='Title' name="title" className='flex-grow h-10 outline-none border-2
                                border-gray-400 rounded-lg px-5 py-2 text-lg font-medium
                                text-gray-600 cursor-pointer hover:text-gray-900' value={profileData.newExperience.title} onChange={handleExperienceChange} />
                            <input type="text" placeholder='Company' name="company" className='flex-grow h-10 outline-none border-2 border-gray-400 rounded-lg px-5 py-2 text-lg font-medium text-gray-600 cursor-pointer hover:text-gray-900'
                                value={profileData.newExperience.company}
                                onChange={handleExperienceChange} />
                            <input type="text" placeholder='Description' name="description" className='flex-grow h-10 outline-none border-2
                                border-gray-400 rounded-lg px-5 py-2 text-lg font-medium
                                text-gray-600 cursor-pointer hover:text-gray-900' value={profileData.newExperience.description} onChange={handleExperienceChange} />
                            <button className='w-full sm:w-[20%] h-10 outline-none border-2
                                border-gray-400 rounded-lg px-2 py-2 text-lg font-medium bg-gray-400
                                text-gray-600 cursor-pointer hover:text-gray-900' onClick={handleExperience}>Add</button>
                        </div>
                    </div>


                    <button onClick={handleSave} disabled={loading} className='w-[90%] h-[50px] mb-10 text-lg font-bold bg-[#004182] text-white rounded-lg cursor-pointer hover:bg-[#003569]'>
                        {loading ? "Saving..." : "Save Profile"}
                    </button>
                </div>
            </div>
        </div >
    );
}

export default EditProfile;
