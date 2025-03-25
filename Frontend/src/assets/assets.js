import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import profile from './profile.jpg'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.png'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    profile,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr.Aryan Patel',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Aryan Patel is a skilled General Physician with 4+ years of experience in diagnosing and treating various medical conditions. He specializes in preventive care, chronic disease management, and patient counseling, ensuring a patient-first approach to healthcare.',
        fees: 500,
        address: {
            line1: '123, health street, green valley',
            line2: 'Delhi,India'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr.Aisha Kapoor',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Aisha Kapoor is a dedicated Gynecologist with over 3 years of experience in providing compassionate and professional care to women. She specializes in the diagnosis, treatment, and prevention of reproductive health issues, and offers services ranging from routine check-ups to complex gynecological procedures.',
        fees: 600,
        address: {
            line1: '123 Health Avenue',
            line2: 'New Delhi ,India'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr.Vihaan Sharma',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Vihaan Sharma is a passionate Dermatologist with a focus on treating skin conditions. With a strong educational background and 1 year of hands-on experience in the field, he strives to provide the best care and treatment for his patients.',
        fees: 300,
        address: {
            line1: '123 Dermatology Lane',
            line2: 'Delhi, India'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr.Kunal Mehta',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Kunal Mehta is a compassionate and skilled pediatrician with 2 years of experience in providing excellent medical care to children. He has expertise in diagnosing and treating a wide range of childhood illnesses and has a deep commitment to improving childrens health and well-being.',
        fees: 400,
        address: {
            line1: '123, health Clinic, health street',
            line2: 'Delhi,India'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr.Neha Verma',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Neha Verma is an experienced neurologist specializing in the diagnosis and treatment of neurological conditions. With 4 years of practice in the field, she is dedicated to providing compassionate care for patients with neurological disorders. Her expertise includes treating patients with conditions such as migraines, epilepsy, stroke, and other brain and nervous system-related issues. Dr. Verma stays updated with the latest advancements in the field to offer the best treatment options to her patients',
        fees: 500,
        address: {
            line1: '456 Brain Care Road',
            line2: 'New Delhi, India'
        }
    },
    
    {
        _id: 'doc6',
        name: 'Dr. Rohan Khanna',
        image: doc6,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Rohan Khanna is a skilled General Physician with a keen focus on diagnosing and treating a wide range of health issues. He is dedicated to providing compassionate and comprehensive care to his patients, ensuring their well-being through effective treatment and health advice.',
        fees: 500,
        address: {
            line1: '12, Medical Tower, Main Street, Sector 25, City Center',
            line2: 'New Delhi ,India'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr.Aarav Saxena',
        image: doc7,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Aarav Saxena is a dedicated Gynecologist with a focus on women’s health, including reproductive issues and routine gynecological care. He has gained experience over three years of practice, providing quality treatment and guidance to patients.',
        fees: 600,
        address: {
            line1: 'Sunrise Medical Clinic,123 Health Avenue,Sector 12',
            line2: 'Delhi,India'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr.Saanvi Rao',
        image: doc8,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Saanvi Rao is a dedicated dermatologist with 1 year of experience in treating various skin conditions. She is skilled in diagnosing and providing effective treatments for acne, eczema, psoriasis, and other dermatological issues. Dr. Saanvi emphasizes preventive care and patient education to help individuals achieve healthy, glowing skin.',
        fees: 300,
        address: {
            line1: '45, SkinCare Clinic, Green Park Road, Sector 14',
            line2: 'Bangalore, India'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr.Vikram Jain',
        image: doc9,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Vikram Jain is a dedicated pediatrician with 2 years of experience in treating children and infants. He focuses on providing comprehensive care, from newborns to adolescents, addressing health issues, and promoting overall well-being. Dr. Jain is passionate about child development and is committed to delivering high-quality care with a compassionate approach.',
        fees: 400,
        address: {
            line1: '123 Health Lane,Pediatrics Clinic,Sector 15',
            line2: 'Delhi,India'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr.Kavita Sharma',
        image: doc10,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Kavita Sharma is a highly skilled neurologist with 4 years of experience in diagnosing and treating various neurological conditions. She is passionate about providing personalized care and treatment for patients dealing with disorders related to the brain, spinal cord, and nervous system. Dr. Sharma is dedicated to staying updated with the latest medical advancements to offer the best possible care to her patients.',
        fees: 500,
        address: {
            line1: '15, Brain Care Clinic, Medical Complex, Main Road, Sector 12, City Center',
            line2: ' New Delhi, India'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr.Rajat Mehra',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Rajat Mehra is a highly experienced neurologist, specializing in the diagnosis and treatment of various neurological conditions. With a deep understanding of brain and nerve functions, he provides personalized care to his patients.',
        fees: 500,
        address: {
            line1: '123, health street, green valley',
            line2: ' New Delhi, India'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr.Tanuja Roj',
        image: doc12,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: ' Dr. Tanuja Roj is a skilled General Physician with four years of experience in diagnosing and treating a wide variety of medical conditions. Her practice focuses on providing comprehensive care to individuals and families.',
        fees: 500,
        address: {
            line1: '123 Wellness Road, Health City',
            line2: 'Delhi, India'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr.Rajeev Joshi',
        image: doc13,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Rajeev Joshi is a dedicated Gynecologist with 3 years of experience in providing quality healthcare to women. With a focus on patient care and comprehensive treatment plans, he specializes in addressing women’s health concerns, including reproductive health, prenatal care, and other gynecological conditions.',
        fees: 600,
        address: {
            line1: ' 45, Medical Plaza, Near City Hospital, Sector 15',
            line2:  'Chandigarh, India'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr.Swati Agarwal',
        image: doc14,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Swati Agarwal is a dedicated and compassionate dermatologist with 1 year of experience in providing treatments for skin-related issues. She specializes in diagnosing and managing a wide range of skin conditions, including acne, eczema, and skin infections. She is committed to offering personalized care to her patients to help them achieve healthy, radiant skin.',
        fees: 300,
        address: {
            line1: '45, Skin Care Clinic, First Floor, Rose Avenue, Sector 22',
            line2: 'Chandigarh, India'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr.Vivek Mehra',
        image: doc15,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr.Vivek Mehra is a highly experienced neurologist with expertise in treating various neurological conditions. With over 4 years of practice, he provides comprehensive care for disorders affecting the nervous system.',
        fees: 500,
        address: {
            line1: '789 Neuro Health Avenue',
            line2: 'Mumbai Maharashtra ,India'
        }
    },
]