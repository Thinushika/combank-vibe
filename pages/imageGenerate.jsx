import Layout from '@/components/layout'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import LoadingDots from '@/components/ui/LoadingDots';

const ImageGenerate = () => {
    const [userPrompt, setUserPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [resData, setResData] = useState();


    useEffect(() => {

    }, [userPrompt])


    const handleGenerate = async () => {
        try {
            setIsLoading(true);
            console.log('prompt : ', userPrompt)
            const response = await fetch('/api/generateImage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userPrompt: userPrompt }),
            });

            if (response.status !== 200) {
                const error = await response.json();
                throw new Error(error.message);
            }
            
            const data = await response.json();
            console.log(data)
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
        finally {
            setUserPrompt('')
        }
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
                                                <input type="text" name="prompt" id="user_prompt" className='mb-2 py-3 px-3 w-100 transparent-input' value={userPrompt} onChange={(e) => { setUserPrompt(e.target.value) }} />
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
                                                    <div className="d-flex row row-cols-1 row-cols-md-2 row-cols-lg-4">
                                                        <div className="d-flex rounded p-2">
                                                            <Image src={'/sliderimg-1.png'} alt="" width={100} height={100} className='rounded' style={{ borderRadius: "20px !important" }} />
                                                        </div>
                                                        <div className="d-flex rounded p-2">
                                                            <Image src={'/sliderimg-2.png'} alt="" width={100} height={100} className='rounded' style={{ borderRadius: "20px !important" }} />
                                                        </div>
                                                        <div className="d-flex rounded p-2">
                                                            <Image src={'/sliderimg-3.png'} alt="" width={100} height={100} className='rounded' style={{ borderRadius: "20px !important" }} />
                                                        </div>
                                                        <div className="d-flex rounded p-2">
                                                            <Image src={'/sliderimg-4.png'} alt="" width={100} height={100} className='rounded' style={{ borderRadius: "20px !important" }} />
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
                </div>
            </Layout>
        </>
    )
}

export default ImageGenerate