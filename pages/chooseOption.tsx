import Layout from '@/components/layout'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const ChooseOption = () => {
    const [selected, setSelected] = useState('');

    const handleSelect = () => {
        if(selected === 'generateImage'){
            console.log('generateImage')
            location.href='/userDetails'
        }
        else if(selected === 'seeFuture'){
            console.log("seeFuture")
            location.href='/userDetails'
        }
        else{
            console.log("please select option")
            alert('Please select an option to continue..')
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
                                            <div className="d-flex flex-column justify-content-center transparent-select-box align-items-center text-center mt-5 pt-5">
                                                <h2 className="text-white font-option-page px-2">CHOOSE AN OPTION</h2>
                                                {/* <p className="text-white font-18 mb-5">Share your info with us and our representatives will get in touch with you!
                                                </p> */}
                                                <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center">
                                                    <div className="col-12 col-lg-6 d-flex flex-column text-white select-box p-0 p-lg-5 mx-2 mx-lg-5 justify-content-center align-items-center my-2 my-lg-3" 
                                                    onClick={()=>setSelected('generateImage')}>
                                                        {/* <div className="select-box p-5"> */}
                                                        <Image src={'/icon-user.png'} alt="" width={40} height={40} className='icon-size'/>
                                                        <h2 className='text-white option-font' style={{ fontWeight: 'bold' }}>
                                                            Generate an image of future you
                                                        </h2>
                                                        {/* </div> */}
                                                    </div>
                                                    <div className="col-12 col-lg-6 d-flex flex-column text-white select-box p-0 p-lg-5 mx-2 mx-lg-5 justify-content-center align-items-center my-2 my-lg-3"
                                                    onClick={()=>setSelected('seeFuture')}>
                                                        {/* <div className="select-box p-5"> */}
                                                        <Image src={'/icon-comment.png'} alt="" width={40} height={40} className='icon-size'/>
                                                        <h2 className='text-white option-font' style={{ fontWeight: 'bold' }}>
                                                            See how to be the future you
                                                        </h2>
                                                        {/* </div> */}
                                                    </div>
                                                </div>
                                                
                                                    <button type="submit" onClick={handleSelect} className="my-3" style={{
                                                        backgroundColor: "#ee3035", color: "#fff", fontWeight: "bold", height: "50px"
                                                    }}
                                                    >
                                                        NEXT
                                                    </button>
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

export default ChooseOption