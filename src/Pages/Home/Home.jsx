import React from "react";
import HomePage from "../../assets/Home/Homepage.png";  
import OrangeRectangle from "../../assets/Home/OrangeRectangle.png"; 
import PlanExample from "../../assets/Home/PlanExample.png"; 

const Home = () => {
    return (
        <div>
            <div className="flex justify-between items-center p-10">
                <div className="flex flex-col space-y-4 ml-96">
                    <h1 className="text-6xl font-bold font-poppins">
                        Optimize Your <br />
                        Delivery Routes<br />
                        with AI Precision
                    </h1>
                    <p className="text-lg font-quattrocento">
                        Save up to 30% on fuel costs and<br /> 
                        reduce delivery times with our<br /> 
                        all-in-one route optimization platform.
                    </p>
                    <button
                        style={{ width: '150px' }} 
                        className="mt-4 bg-[#FD7E14] text-white py-2 px-4 rounded font-bold font-quattrocento"
                    >
                        Start Free Trial
                    </button>
                </div>

                <div>
                    <img src={HomePage} alt="Delivery Optimization" className="w-9/12 h-auto mr-96 mt-28" />
                </div>
            </div>


            <div className="relative">
                <img src={OrangeRectangle} alt="Orange Rectangle" className="w-full" />
                <div className="absolute top-6 left-0 w-full h-full flex justify-around items-center">
                    <div className="flex flex-col items-center">
                    <span className="font-manrope text-transparent bg-clip-text font-extrabold text-6xl"
                        style={{
                            background: 'linear-gradient(to right, #010B1A 14%, #1078AB 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text'
                        }}
                    >
                        1B+
                    </span>
                        <span className="font-lato mt-2 font-semibold">Miles Optimized</span>
                    </div>

                    <div className="flex flex-col items-center">
                    <span className="font-manrope text-transparent bg-clip-text font-extrabold text-6xl"
                        style={{
                            background: 'linear-gradient(to right, #010B1A 0%, #1078AB 95%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text'
                        }}
                    >
                        200M+
                    </span>
                        <span className="font-lato mt-2 font-semibold">Stop Visited</span>
                    </div>

                    <div className="flex flex-col items-center">
                    <span className="font-manrope text-transparent bg-clip-text font-extrabold text-6xl"
                        style={{
                            background: 'linear-gradient(to right, #3B3D43 25%, #288184 92%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text'
                        }}
                    >
                        30M+
                    </span>
                        <span className="font-lato mt-2 font-semibold">Route Planned</span>
                    </div>

                    <div className="flex flex-col items-center">
                    <span className="font-manrope text-transparent bg-clip-text font-extrabold text-6xl"
                        style={{
                            background: 'linear-gradient(to right, #010B1A 0%, #1078AB 95%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text'
                        }}
                    >
                        50K+
                    </span>
                        <span className="font-lato mt-2 font-semibold">Happy Customers</span>
                    </div>
                </div>
            </div>

            <div className="text-center mt-10">
                <p className="text-[#E37A34] font-bold font-lato text-2xl">
                    Complex destinations and vehicle management in just 3 seconds
                </p>
                <p className="font-extrabold font-urbanist text-3xl mt-5">
                    Route Optimization and Planning Solution
                </p>
            </div>

            <img src={PlanExample} alt="Plan Example" className="w-8/12 p-6 mx-auto " />

            <div className="text-center mt-10">
                <p className="text-[#FD7E14] font-black font-urbanist text-base">
                    HOW IT WORKS?
                </p>
                <p className="font-bold font-urbanist text-3xl mt-5">
                A seamless solution to <br /> 
                optimize every aspect of your delivery process.
                </p>
            </div>
        </div>
    );
};

export default Home;
