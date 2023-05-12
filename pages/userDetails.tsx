import Layout from '@/components/layout'
import React, { useState } from 'react'

const UserDetails = () => {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIsChecked(event.target.checked);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (isChecked) {
            console.log('checked')
        } else {
            console.log('not checked')
        }
    };

    return (
        <>
            <Layout>
                <div className="container-fluid m-0 p-0 background_pages">
                    <div className="home_slider_container p-0 m-0 position-relative">

                        <div>
                            <div className="home_slider_image_container image1 p-0 m-0 ">
                                <div className="d-flex justify-content-center align-items-center align-items-lg-end  w-100">
                                    <div className="d-flex flex-column justify-content-center align-items-center home-txt-container w-100">
                                        <div className="conlainer-fluid m-0 px-3 px-lg-0 py-3 py-lg-4 w-100 d-flex justify-content-center align-items-center">
                                            <div className="d-flex flex-column justify-content-center align-items-center text-center mt-5 pt-5 transparent-select-box">
                                                <h2 className="text-white font-36">ENTER YOUR DETAILS</h2>
                                                {/* <p className="text-white font-18 mb-5">Share your info with us and our representatives will get in touch with you!
                                                </p> */}
                                                <div className=" col-12   px-2 px-lg-5 mt-2 mb-5 d-flex flex-column justify-content-center align-items-center">
                                                    <input type="text" placeholder="Your Name" className="mb-2 py-3 px-3 w-100 transparent-input" />
                                                    <input type="text" placeholder="Your Age" className="mb-2 py-3 px-3 w-100 transparent-input" />
                                                    <input type="text" placeholder="Your Gender" className="mb-2 py-3 px-3 w-100 transparent-input" />
                                                    <input type="text" placeholder="Your Location" className="mb-2 py-3 px-3 w-100 transparent-input" />
                                                    <input type="text" placeholder="Your Interests" className="mb-2 py-3 px-3 w-100 transparent-input" />
                                                    <input type="text" placeholder="Your Ambition" className="mb-2 py-3 px-3 w-100 transparent-input" />
                                                    <input type="text" placeholder="Your Education Background" className="mb-2 py-3 px-3 w-100 transparent-input" />

                                                    <label className='d-flex flex-row text-white text-start px-3 mt-2'>
                                                        <input
                                                            type="checkbox"
                                                            className='checkbox-style me-2'
                                                            checked={isChecked}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        <p>I agree to the terms and conditions</p>
                                                    </label>
                                                    
                                                    <button className="submit-btn my-3 px-3" onClick={()=> location.href='/success'}>NEXT</button>
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

export default UserDetails