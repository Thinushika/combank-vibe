import Layout from '@/components/layout'
import LoadingDots from '@/components/ui/LoadingDots';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'




const UserDetails = () => {

    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [interests, setInterests] = useState('');
    const [ambition, setAmbition] = useState('');
    const [education, setEducation] = useState('');

    const [aiMessage, setAiMessage] = useState('');

    const router = useRouter();


    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIsChecked(event.target.checked);
    };



    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (isChecked) {
            console.log('checked')
            setIsLoading(true);


            try {
                const response = await fetch("/api/generate", {
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
                            interests: interests,
                            ambition: ambition,
                            education: education
                        }
                    ),
                });

                const data = await response.json();
                if (response.status !== 200) {
                    throw data.error || new Error(`Request failed with status ${response.status}`);
                }
                setAiMessage(data.result)
                console.log(aiMessage.toString())

                setIsLoading(false);
                router.push('/botResponse');

            } catch (error) {
                console.error(error);
            }


        } else {
            console.log('not checked')
        }
    };


    useEffect(() => {
        if (aiMessage) {
            localStorage.setItem('aiMessage', aiMessage);
        }
    }, [aiMessage]);

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
                                                <form className=" col-12   px-2 px-lg-5 mt-2 mb-5 d-flex flex-column justify-content-center align-items-center">
                                                    <input type="text" required placeholder="Your Name" className="mb-2 py-3 px-3 w-100 transparent-input" onChange={(e) => setName(e.target.value)} />
                                                    <input type="text" required placeholder="Your Age" className="mb-2 py-3 px-3 w-100 transparent-input" onChange={(e) => setAge(e.target.value)} />
                                                    <input type="text" required placeholder="Your Gender" className="mb-2 py-3 px-3 w-100 transparent-input" onChange={(e) => setGender(e.target.value)} />
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

                                                    <input type="text" placeholder="Your Interests" className="mb-2 py-3 px-3 w-100 transparent-input" onChange={(e) => setInterests(e.target.value)} />
                                                    <select className="mb-2 py-3 px-3 w-100 transparent-input" required onChange={(e) => setAmbition(e.target.value)}>
                                                        <option value="">Select your Ambition</option>
                                                        <option value="Doctor">Doctor</option>
                                                        <option value="Software Engineer">Software Engineer</option>
                                                        <option value="Lawyer">Lawyer</option>
                                                        <option value="Teacher">Teacher</option>
                                                    </select>

                                                    <input type="text" placeholder="Your Education Background" className="mb-2 py-3 px-3 w-100 transparent-input" onChange={(e) => setEducation(e.target.value)} />

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

export default UserDetails