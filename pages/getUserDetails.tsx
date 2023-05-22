import Layout from '@/components/layout'
import LoadingDots from '@/components/ui/LoadingDots';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import fs from "fs/promises";
import path from "path";
import { FiUpload } from "react-icons/fi";
import Link from 'next/link';


interface Props {
    dirs: string[];
}

const UserDetails: NextPage<Props> = ({ dirs }) => {

    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [ambition, setAmbition] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [aiMessage, setAiMessage] = useState('');
    const [resId, setResId] = useState('');
    const [selectedImage, setSelectedImage] = useState("");
    const [savedImageUrl, setSavedImageUrl] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();
    const router = useRouter();

    useEffect(() => {
        // if (dirs.length > 0) {
        //     const latestDir = dirs[dirs.length - 1]; 
        //     setSavedImageUrl(`https://localhost:3000/images/${latestDir}`);
        //     console.log('savedImageUrl:', savedImageUrl);
        //   }
    }, [dirs, name, age, gender, country, ambition, email, phoneNo, aiMessage, resId, savedImageUrl])


    // handle image upload
    const handleUpload = async () => {
        try {
            if (!selectedFile) return
            const formData = new FormData();
            formData.append("myImage", selectedFile);
            const { data } = await axios.post("/api/image", formData);
            console.log("data : ", data)
        } catch (error: any) {
            console.log(error.response?.data)
        }
    }


    // checkbox
    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIsChecked(event.target.checked);
    };



    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        handleUpload()

        if (isChecked) {
            console.log('checked')
            setIsLoading(true);
            if (dirs.length > 0) {
                const latestDir = dirs[dirs.length - 1];
                setSavedImageUrl(`https://combank-vibe.vercel.app/images/${latestDir}`);
                console.log('savedImageUrl:', savedImageUrl);
            }

            try {
                // data to backend
                console.log(`data : ${name} , ${age} ,${gender} ,${email} , ${phoneNo}, ${ambition} , ${country}, ${savedImageUrl} `)
                const response = await fetch("https://it-marketing.website/vibe-backend/api/save-customer-data", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            name: name,
                            age: age,
                            gender: gender,
                            location: country,
                            ambition: ambition,
                            email: email,
                            phoneNo: phoneNo,
                            savedImageUrl: "savedImageUrl",
                        }
                    ),
                });

                const dataBackend = await response.json();
                if (response.status !== 200) {
                    throw dataBackend.error || new Error(`Request failed with status ${response.status}`);
                }
                const resCustomerId = dataBackend.id
                setResId(resCustomerId)
                console.log("respons id : ", resCustomerId)

                // chat gpt generate
                const responseOpenAi = await fetch("/api/generate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            name: name,
                            age: age,
                            location: country,
                            ambition: ambition,
                        }
                    ),
                });

                const data = await responseOpenAi.json();
                if (responseOpenAi.status !== 200) {
                    throw data.error || new Error(`Request failed with status ${responseOpenAi.status}`);
                }
                setAiMessage(data.result)
                console.log(aiMessage.toString())


                // try {
                
                // } catch (error) {
                //     console.log(error)
                // }



                setIsLoading(false);
                router.push('/success');

            } catch (error) {
                console.error(error);
            }


        } else {
            console.log('not checked')
        }

    };

    // store in local storage
    useEffect(() => {
        if (aiMessage) {
            localStorage.setItem('aiMessage', aiMessage);
            localStorage.setItem('ambition', ambition);

            const sendMessage = async (aiMessage: string)=>{
                console.log("resId : ", resId)
                    console.log("ai message : ", aiMessage)

                    const responseAiMessage = await fetch("https://it-marketing.website/vibe-backend/api/save-customer-ambition-response", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(
                            {
                                customerId: resId,
                                ambitionResponse: aiMessage
                            }
                        ),
                    });

                    const dataAiMessage = await responseAiMessage.json();
                    if (responseAiMessage.status !== 200) {
                        throw dataAiMessage.error || new Error(`Request failed with status ${responseAiMessage.status}`);
                    }
                    console.log(dataAiMessage)
            }
            sendMessage(aiMessage)
        }
    }, [aiMessage, ambition]);




    return (
        <>
            <Layout>
                <div className="container-fluid m-0 p-0 background_user_details">
                    <div className="home_slider_container p-0 m-0 position-relative">

                        <div>
                            <div className="home_slider_image_container image1 p-0 m-0 ">
                                <div className="d-flex justify-content-center align-items-center align-items-lg-end  w-100">
                                    <div className="d-flex flex-column justify-content-center align-items-center home-txt-container w-100">
                                        <div className="conlainer-fluid m-0 px-3 px-lg-0 py-3 py-lg-5 my-3 my-lg-5 w-100 d-flex justify-content-center align-items-center">
                                            <div className="d-flex flex-column justify-content-center align-items-center text-center mt-5 pt-5 transparent-select-box">
                                                <div id="blur_background"></div>
                                                <h2 className="text-white font-36">ENTER YOUR DETAILS</h2>
                                                <form className=" col-12   px-2 px-lg-5 mt-2 mb-5 d-flex flex-column justify-content-center align-items-center">
                                                    <input type="text" required placeholder="Your Name" className="mb-2 py-3 px-3 w-100 transparent-input" onChange={(e) => setName(e.target.value)} />
                                                    <input type="text" required placeholder="Your Age" className="mb-2 py-3 px-3 w-100 transparent-input" onChange={(e) => setAge(e.target.value)} />
                                                    <input type="text" required placeholder="Your Gender" className="mb-2 py-3 px-3 w-100 transparent-input" onChange={(e) => setGender(e.target.value)} />
                                                    <input type="text" required placeholder="Your Email" className="mb-2 py-3 px-3 w-100 transparent-input" onChange={(e) => setEmail(e.target.value)} />
                                                    <input type="text" required placeholder="Your Phone Number" className="mb-2 py-3 px-3 w-100 transparent-input" onChange={(e) => setPhoneNo(e.target.value)} />
                                                    <select className="mb-2 py-3 px-3 w-100 transparent-input" required onChange={(e) => setCountry(e.target.value)}>
                                                        <option value="">Select your country</option>
                                                        <option value="United States">United States</option>
                                                        <option value="Canada">Canada</option>
                                                        <option value="Sri Lanka">Sri Lanka</option>
                                                        <option value="United Kingdom">United Kingdom</option>
                                                        <option value="Australia">Australia</option>
                                                        <option value="France">France</option>
                                                        <option value="Germany">Germany</option>
                                                        <option value="Japan">Japan</option>
                                                        <option value="China">China</option>
                                                    </select>

                                                    <select className="mb-2 py-3 px-3 w-100 transparent-input" required onChange={(e) => setAmbition(e.target.value)}>
                                                        <option value="">Select your Ambition</option>
                                                        <option value="Doctor">Doctor</option>
                                                        <option value="Software Engineer">Software Engineer</option>
                                                        <option value="Lawyer">Lawyer</option>
                                                        <option value="Teacher">Teacher</option>
                                                    </select>

                                                    <label htmlFor="upload-input" className="hidden-file-input">
                                                        <input
                                                            type="file"
                                                            id="upload-input"
                                                            onChange={({ target }) => {
                                                                if (target.files) {
                                                                    const file = target.files[0];
                                                                    setSelectedImage(URL.createObjectURL(file));
                                                                    setSelectedFile(file)
                                                                }
                                                            }}
                                                        />
                                                        <div className="d-flex rounded justify-content-center align-items-center curser-pointer" style={{ width: '200px' }}>
                                                            {
                                                                selectedImage ? (
                                                                    <img src={selectedImage} alt="" />
                                                                ) : (
                                                                    <span className='text-white mb-2 py-3 px-3 w-100 transparent-input'>Select Image <FiUpload style={{ width: '25px' }} /></span>
                                                                )
                                                            }
                                                        </div>
                                                    </label>
                                                    <Link href={savedImageUrl}>{savedImageUrl}</Link>

                                                    <label className='d-flex flex-row text-white text-start px-3 mt-2'>
                                                        <input
                                                            type="checkbox"
                                                            className='checkbox-style me-2'
                                                            checked={isChecked}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        <p>I agree to the terms and conditions</p>
                                                    </label>

                                                    <button className="submit-btn text-center d-flex justify-content-center align-items-center my-3 px-3" onClick={handleSubmit}>
                                                        {isLoading ? (
                                                            <LoadingDots color="#fff" />
                                                        ) : (
                                                            <p className='mb-0'>NEXT</p>
                                                        )}

                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async () => {
    // const props = { dirs: [] };
    try {
        const dirs = await fs.readdir(path.join(process.cwd(), "/public/images"));
        const props: Props = { dirs: dirs as string[] };
        return { props };
    } catch (error) {
        const props: Props = { dirs: [] };
        return { props };
    }
};

export default UserDetails