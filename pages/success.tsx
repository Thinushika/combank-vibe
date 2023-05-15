import Layout from '@/components/layout'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Success = () => {
    const [aiMessage, setAiMessage] = useState(null);

    useEffect(() => {
        const aiMessageString = window.localStorage.getItem("aiMessage");
        if (aiMessageString) {
            setAiMessage(JSON.parse(aiMessageString));
        }
    }, []);
    return (
        <Layout>
            <div className="container-fluid m-0 p-0 background_pages">
                <div className="home_slider_container p-0 m-0 position-relative">

                    <div>
                        <div className="home_slider_image_container min-height d-flex flex-column justify-content-center align-items-center image1 p-2 m-0 ">
                            <div className="d-flex flex-column justify-content-center align-items-center text-center mt-5 pt-5 transparent-select-box">
                                <h2 className="text-white font-36">Thank you</h2>
                                <p className="text-white font-18 mb-3">
                                    Your Image is now being generated and you will receive it shortly via email
                                </p>
                                {aiMessage ? (
                                                        <p>{aiMessage}</p>
                                                    ) : (
                                                        <p>No AI message received yet</p>
                                                    )}
                                <Image src={'/correct.png'} className='correct-img mb-5' alt='' width={107} height={107} ></Image>
                                
                            </div>
                            <button className="submit-btn my-3 px-3" type="submit">FINISH</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Success