import Layout from '@/components/layout'
import { GetServerSideProps, NextPage } from "next";
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import LoadingDots from '@/components/ui/LoadingDots';
import fs from "fs/promises";
import path from "path";
import axios from 'axios';
import Link from 'next/link';


interface Props {
    dirs: string[];
}

const ImageGenerate: NextPage<Props> = ({ dirs }) => {

    const [isLoading, setIsLoading] = useState(false);

    const [userImage, setUserImage] = useState('');
    const [userAge, setUserAge] = useState('');
    const [position, setPosition] = useState('');
    const [country, setCountry] = useState('');
    const [gender, setGender] = useState('');

    const [userPrompt, setUserPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageId, setImageId] = useState('')

    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();

    const [savedImageUrl, setSavedImageUrl] = useState('')

    const [uploadState, setUploadState] = useState(false)
    const [uploadedImageUrl, setUploadedImageUrl] = useState('')



    // handle image upload
    const handleUpload = async () => {
        setUploading(true)
        try {
            if (!selectedFile) return
            const formData = new FormData();
            formData.append("myImage", selectedFile);
            const { data } = await axios.post("/api/image", formData);
            console.log("data : ", data)
        } catch (error: any) {
            console.log(error.response?.data)
        }
        setUploading(false)
    }

    // set variables
    useEffect(() => {
        setUserPrompt(`after 5 years as a ${country} ${gender} ${position} `);
        setSavedImageUrl("https://combank-vibe.vercel.app/images/" + dirs[dirs.length - 1])
        console.log("savedImageUrl : ",savedImageUrl)
    }, [userPrompt, imageUrl, userImage, imageId, position, uploadedImageUrl, country, userAge, dirs])


    // generate image main function - getting message id
    const handleGenerate = async () => {
        try {
            setIsLoading(true);
            // console.log('image : ', userImage)
            // console.log('prompt : ', userPrompt)
            let urlPrompt = `${savedImageUrl} ${userPrompt}`
            // console.log("urlPrompt : ", urlPrompt)
            const response = await fetch('https://api.thenextleg.io/v2/imagine', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_LEG}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "msg": urlPrompt
                }),
            });

            if (response.status !== 200) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const data = await response.json();
            console.log("imagine : ", data)
            setImageId(data.messageId);
            setUploadState(true)
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }



    // check image generated every 5 seconds
    useEffect(() => {

        let timerId: string | number | NodeJS.Timer | undefined;
        const handleImageUrl = async () => {
            const responseImage = await fetch(`https://api.thenextleg.io/v2/message/${imageId}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${process.env.NEXT_LEG}`,
                'Content-Type': 'application/json'
              }
            });
      
            if (responseImage.status !== 200) {
              const error = await responseImage.json();
              throw new Error(error.message);
            }
      
            const imageData = await responseImage.json();
            console.log("image url:", imageData.response.imageUrl);
            setImageUrl(imageData.response.imageUrl);
            setUploadState(false); // Stop further requests once response is received
          };
      
          if (uploadState && imageId) {
            timerId = setInterval(() => {
              handleImageUrl();
            }, 5000);
          }
      
          return () => {
            clearInterval(timerId); // Clear the interval when the component unmounts or when dependencies change
          };
       

        // if (uploadState === true) {
        //     setTimeout(() => {
        //         const handleImageUrl = async () => {
        //             const responseImage = await fetch(`https://api.thenextleg.io/v2/message/${imageId}`, {
        //                 method: 'GET',
        //                 headers: {
        //                     'Authorization': 'Bearer 9b59b06c-6616-4bce-8eeb-e47f9e4ff57c',
        //                     'Content-Type': 'application/json'
        //                 }
        //             });

        //             if (responseImage.status !== 200) {
        //                 const error = await responseImage.json();
        //                 throw new Error(error.message);
        //             }

        //             const imageData = await responseImage.json();
        //             console.log("image url : ", imageData.response.imageUrl);
        //             setImageUrl(imageData.response.imageUrl)
        //         }
        //         handleImageUrl()
        //     }, 5000);
        // }
    }, [uploadState, imageId])






    return (
        <>
            <Layout>
                <div className="container-fluid m-0 p-0 background_pages">
                    <div className="home_slider_container p-0 m-0 position-relative">

                        <div>
                            <div className="home_slider_image_container min-height image1 p-0 m-0 ">
                                <div className="d-flex justify-content-center align-items-center align-items-lg-end  w-100">
                                    <div className="d-flex flex-column justify-content-center align-items-center home-txt-container w-100">
                                        <div className="conlainer-fluid m-0 px-3 px-lg-0 py-3 py-lg-4 w-100 d-flex justify-content-center">
                                            <div className="d-flex flex-column justify-content-center transparent-select-box p-4 align-items-center text-center mt-5 pt-5">
                                                <h2 className="text-white font-option-page px-2">Generate an image of future you</h2>
                                                {/* ==========  get prompt ================ */}
                                                <p className="text-white font-18 mb-5">
                                                    Describe Who you want to be
                                                </p>
                                                {/* <input type="file" name="image" id="user_image" placeholder='Upload your photo here' className='mb-2 py-3 px-3 w-100 transparent-input' onChange={handleImageUpload} />
                                                <div className="d-flex w-50">
                                                {userImage && <Image src={userImage} alt="User's uploaded image" width={300} height={400} className='px-5' />}
                                                </div> */}
                                                <label htmlFor="">
                                                    <input
                                                        type="file"
                                                        onChange={({ target }) => {
                                                            if (target.files) {
                                                                const file = target.files[0];
                                                                setSelectedImage(URL.createObjectURL(file));
                                                                setSelectedFile(file)
                                                            }
                                                        }}
                                                    />
                                                    <div className="d-flex rounded border justify-content-center align-items-center curser-pointer" style={{ width: '200px' }}>
                                                        {
                                                            selectedImage ? (
                                                                <img src={selectedImage} alt="" />
                                                            ) : (
                                                                <span className='text-white'>Select Image</span>
                                                            )
                                                        }
                                                    </div>
                                                </label>
                                                <button onClick={handleUpload} disabled={uploading} style={{ opacity: uploading ? ".5" : "1" }} className='bg-danger px-2 my-2 text-center rounded text-white'>
                                                    {uploading ? "Uploading.." : "Upload"}
                                                </button>

                                                <div className="mt-20 d-flex flex-column py-3">
                                                    {/* {dirs.map((item) => (
                                                        <Link key={item} href={"/images/" + item}>
                                                            {item}
                                                        </Link>
                                                     ))} */}
                                                    <Link href={savedImageUrl}>{savedImageUrl}</Link>
                                                </div>

                                                <input type="text" name="prompt" id="user_prompt" placeholder='Enter your age' className='mb-2 py-3 px-3 w-100 transparent-input' value={userAge} onChange={(e) => { setUserAge(e.target.value) }} />
                                                <input type="text" name="gender" id="user_gender" placeholder='Gender' className='mb-2 py-3 px-3 w-100 transparent-input' value={gender} onChange={(e) => { setGender(e.target.value) }} />
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
                                                <select className="mb-2 py-3 px-3 w-100 transparent-input" required onChange={(e) => setPosition(e.target.value)}>
                                                    <option value="">Select your Ambition</option>
                                                    <option value="Doctor">Doctor</option>
                                                    <option value="Software Engineer">Software Engineer</option>
                                                    <option value="Lawyer">Lawyer</option>
                                                    <option value="Teacher">Teacher</option>
                                                </select>

                                                <button className="submit-btn text-center d-flex justify-content-center align-items-center my-3 px-3" onClick={handleGenerate}>
                                                    {isLoading ? (
                                                        <LoadingDots color="#fff" />
                                                    ) : (
                                                        <p className='mb-0'>GENERATE</p>
                                                    )}

                                                </button>

                                                {/* ============== view images ================= */}
                                                <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center">
                                                    <div className="d-flex ">
                                                        {
                                                            imageUrl && (
                                                                <div className="d-flex rounded p-2">
                                                                    <Image src={imageUrl} alt="" width={1000} height={1000} className='rounded' style={{ borderRadius: "20px !important" }} />
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
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
    const props = { dirs: [] };
    try {
        const dirs = await fs.readdir(path.join(process.cwd(), "/public/images"));
        props.dirs = dirs as any;
        return { props };
    } catch (error) {
        return { props };
    }
};

export default ImageGenerate