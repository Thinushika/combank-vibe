import Layout from '@/components/layout'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import LoadingDots from '@/components/ui/LoadingDots';
import { Agent } from 'http';

const ImageGenerate = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    
    const [userImage, setUserImage] = useState('');
    const [userAge, setUserAge] = useState('');
    const [position, setPosition] = useState('');
    const [country, setCountry] = useState('');

    const [userPrompt, setUserPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageId, setImageId] = useState('')

    const [resData, setResData] = useState();

// image- age-ambition-nationality
    useEffect(() => {
        setUserPrompt(`after 5 years as a ${country} ${position} `)
    }, [userPrompt, imageUrl, imageId, position, country, userAge])


    const handleGenerate = async () => {
        console.log('prompt : ',userPrompt)
        console.log('image : ',userImage)
        // try {
        //     setIsLoading(true);
        //     console.log('prompt : ', userPrompt)
        //     const response = await fetch('https://api.thenextleg.io/v2/imagine', {
        //         method: 'POST',
        //         headers: {
        //             'Authorization': 'Bearer 9b59b06c-6616-4bce-8eeb-e47f9e4ff57c',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             "msg": userPrompt
        //         }),
        //     });

        //     if (response.status !== 200) {
        //         const error = await response.json();
        //         throw new Error(error.message);
        //     }

        //     const data = await response.json();
        //     console.log("imagine : ", data)
        //     setImageId(data.messageId);


        //     if(imageId){
        //         // get image
        //     setTimeout(async () => {
        //         const responseImage = await fetch('https://api.thenextleg.io/v2/message/PdYYjSxFhlEzmJBYlwdu', {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': 'Bearer 9b59b06c-6616-4bce-8eeb-e47f9e4ff57c',
        //             'Content-Type': 'application/json'
        //         }
        //     });

        //     if (responseImage.status !== 200) {
        //         const error = await responseImage.json();
        //         throw new Error(error.message);
        //     }

        //     const imageData = await responseImage.json();
        //     console.log("image url : ", imageData.response.imageUrl);
        //     setImageUrl(imageData.response.imageUrl)
        //     }, 8000);

        //     }


        //     setIsLoading(false);
        // } catch (error) {
        //     console.log(error)
        // }
        // finally {
        //     setUserPrompt('')
        // }
    }

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
                                                <input type="file" name="image" id="user_image" placeholder='Upload your photo here' className='mb-2 py-3 px-3 w-100 transparent-input' onChange={(e) => { setUserImage(e.target.value) }} />
                                                <input type="text" name="prompt" id="user_prompt" placeholder='Enter your age' className='mb-2 py-3 px-3 w-100 transparent-input' value={userAge} onChange={(e) => { setUserAge(e.target.value) }} />
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
                                                {/* <button type="submit" onClick={handleGenerate} className="my-3" style={{
                                                    backgroundColor: "#ee3035", color: "#fff", fontWeight: "bold", height: "50px"
                                                }}
                                                >
                                                    GENERATE
                                                </button> */}
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

export default ImageGenerate