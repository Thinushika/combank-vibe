import Layout from '@/components/layout'
import LoadingDots from '@/components/ui/LoadingDots';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";




const Finder = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState('');
    const [positionError, setPositionError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [nameError, setNameError] = useState(false);


    const router = useRouter();
    const handleSubmit = () => {
        // if(!name){
        //     setNameError(true)
        // }
        // else{
        //     setNameError(false)
        // }
        // if(!country){
        //     setCountryError(true)
        // }
        // else{
        //     setCountryError(false)
        // }
        // if(!position){
        //     setPositionError(true)
        // }
        // else{
        //     setPositionError(false)
        // }
        console.log('name : ', name);
        console.log('country : ', country);
        console.log('position : ', position);
    }

    useEffect(() => {

    }, [name, country, position])


    return (
        <>
            <Layout>
                <div className="container-fluid m-0 p-0 background_pages">
                    <div className="home_slider_container p-0 m-0 position-relative">

                        <div>
                            <div className="home_slider_image_container min-height image1 p-0 m-0 ">
                                <div className="d-flex justify-content-center align-items-center align-items-lg-end  w-100">
                                    <div className="d-flex flex-column justify-content-center align-items-center home-txt-container w-100">
                                        <div className="conlainer-fluid m-0 px-3 px-lg-0 py-3 py-lg-4 w-100 d-flex justify-content-center align-items-center">
                                            <div className="d-flex flex-column justify-content-center align-items-center text-center mt-5 pt-5 transparent-select-box">
                                                <h2 className="text-white font-36">ENTER YOUR DETAILS</h2>
                                                <div className=" col-12   px-2 px-lg-5 mt-2 mb-5 d-flex flex-column justify-content-center align-items-center">
                                                    <input type="text" required placeholder="Your Name" className="mb-2 py-3 px-3 w-100 transparent-input" onChange={(e) => setName(e.target.value)} />
                                                    {nameError && <div className='d-flex justify-content-start text-start text-danger  rounded'>Please enter your name...</div>}
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
                                                    {countryError && <div className='d-flex justify-content-start text-start text-danger  rounded'>Please enter country...</div>}

                                                    <select className="mb-2 py-3 px-3 w-100 transparent-input" required onChange={(e) => setPosition(e.target.value)}>
                                                        <option value="">Select your Ambition</option>
                                                        <option value="Doctor">Doctor</option>
                                                        <option value="Software Engineer">Software Engineer</option>
                                                        <option value="Lawyer">Lawyer</option>
                                                        <option value="Teacher">Teacher</option>
                                                    </select>
                                                    {positionError && <div className='d-flex justify-content-start text-start text-danger  rounded'>Please enter position...</div>}

                                                    <button className="submit-btn text-center d-flex justify-content-center align-items-center my-3 px-3" onClick={handleSubmit}>
                                                        {isLoading ? (
                                                            <LoadingDots color="#fff" />
                                                        ) : (
                                                            // <FiSearch style={{width:'30px'}} />
                                                            <div className='d-flex flex-row'><p className='mb-0'>SEARCH</p> </div>
                                                        )}

                                                    </button>
                                                </div>
                                                <p></p>
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

export default Finder