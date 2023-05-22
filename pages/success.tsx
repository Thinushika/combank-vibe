import Layout from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Success = () => {
    const [ambition, setAmbition] = useState('');


    useEffect(() => {
        const aiAmbitionString = localStorage.getItem("ambition");
        if (aiAmbitionString) {
            setAmbition(aiAmbitionString);
            // localStorage.removeItem('ambition');
        }
    }, []);
    return (
        <Layout>
            <div className="container-fluid m-0 p-0 background_success">
                <div className="home_slider_container p-0 m-0 position-relative">

                    <div>
                        <div className="home_slider_image_container min-height d-flex flex-column justify-content-center align-items-center image1 p-2 pt-lg-5 m-0 ">
                            <div className="d-flex flex-column justify-content-center align-items-center text-center mt-5 pt-5 transparent-select-box">
                                <h2 className="text-white font-36">Thank you</h2>
                                <p className="text-white font-18 mb-3">
                                    Your Image is now being generated and you will receive it shortly via email and Whatsapp
                                </p>
                                <Image src={'/correct.png'} className='correct-img mb-5' alt='' width={107} height={107} ></Image>
                                <Link href="/futureDescription">
                                    <p className="text-white font-18 mb-3">
                                        Do you like to see your path to becoming a {ambition}?
                                    </p>
                                </Link>
                            </div>
                            <button className="submit-btn my-3 px-3" type="submit">NEXT</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Success