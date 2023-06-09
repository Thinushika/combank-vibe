import Layout from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Gallery = () => {
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
                            <div className="d-flex flex-column justify-content-center align-items-center text-center mt-5 pt-5">
                                <h2 className="text-white font-36">GALLERY</h2>
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 px-5">
                                    <div className="p-2">
                                        <Link href={"/shareImage"}>
                                        <Image src={'/sliderimg-1.png'} className='mb-5' alt='' width={200} height={200} ></Image>
                                        </Link>
                                    </div>
                                    <div className="p-2">
                                        <Image src={'/sliderimg-2.png'} className='mb-5' alt='' width={200} height={200} ></Image>
                                    </div>
                                    <div className="p-2">
                                        <Image src={'/sliderimg-4.png'} className='mb-5' alt='' width={200} height={200} ></Image>
                                    </div>
                                    <div className="p-2">
                                        <Image src={'/sliderimg-3.png'} className='mb-5' alt='' width={200} height={200} ></Image>
                                    </div>
                                    <div className="p-2">
                                        <Image src={'/sliderimg-2.png'} className='mb-5' alt='' width={200} height={200} ></Image>
                                    </div>
                                    <div className="p-2">
                                        <Image src={'/sliderimg-4.png'} className='mb-5' alt='' width={200} height={200} ></Image>
                                    </div>
                                    <div className="p-2">
                                        <Image src={'/sliderimg-1.png'} className='mb-5' alt='' width={200} height={200} ></Image>
                                    </div>
                                    <div className="p-2">
                                        <Image src={'/sliderimg-3.png'} className='mb-5' alt='' width={200} height={200} ></Image>
                                    </div>
                                </div>
                            </div>
                            <button className="submit-btn my-3 px-3" type="submit">NEXT</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Gallery