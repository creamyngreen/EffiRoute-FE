    import React from "react";
    import HomePage from "../../assets/Home/Homepage.png";  

    const Home = () => {
    return (
    <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-4 ml-96">
            <h1 className="text-4xl font-bold font-poppins">Optimize Your <br />Delivery Routes<br />with AI Precision</h1>
            <p className="text-lg">
                Save up to 30% on fuel costs and<br /> reduce delivery times with our<br /> all-in-one route optimization platform.
            </p>
            <button
                style={{ width: '150px' }} 
                className="mt-4 bg-[#FD7E14] text-white py-2 px-4 rounded font-bold"
            >
                Start Free Trial
            </button>
        </div>

        <div>
            <img src={HomePage} alt="Delivery Optimization" className="w-auto h-auto mr-96 pt-20" />
        </div>
    </div>
    );
    };

    export default Home;
