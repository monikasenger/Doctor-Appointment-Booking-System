import React from "react";
import { assets } from "../assets/assets";

const AboutUs = () => {
  return (
    <div>


      {/* Section Title */}
      <div className="text-center mb-10 pt-10">
        <p className="text-3xl sm:text-4xl font-extrabold text-gray-800 uppercase tracking-wide">
          About <span className="text-blue-600">Us</span>
        </p>
      </div>


      {/* Text Content */}
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          src={assets.about_image}
          alt="About Us"
          className="w-full md:max-w-[360px] rounded-lg shadow-md object-cover"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-1xl  text-gray-700">
          {/* Introduction */}
          <p >
            Welcome to <span className="font-bold text-blue-600">MediSched</span>, your trusted partner in managing
            healthcare appointments. Our mission is to provide a seamless experience for both
            patients and healthcare professionals by making scheduling effortless.
          </p>

          {/* Our Commitment */}
          <p >
            We are dedicated to leveraging technology to bridge the gap between patients and doctors.
            With an intuitive interface and smart scheduling system, we aim to minimize waiting times
            and enhance accessibility to quality healthcare.
          </p>
          <b className="text-blue-600">Our Vision</b>
          {/* Our Vision */}
          <p>
            We envision a future where healthcare is easily accessible to everyone,
            without the hassle of long queues or complex appointment processes.
            MediSched strives to empower individuals by putting control over
            their healthcare journey in their hands.
          </p>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-16 py-12">
  
  {/* Section Title */}
  <div className="text-center mb-8">
    <p className="text-3xl sm:text-4xl font-extrabold text-gray-800 uppercase tracking-wide">
      Why <span className="text-blue-600">Choose Us</span>
    </p>
  </div>

  {/* Features Container */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
    
    {/* Efficiency */}
    <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200">
      <b className="text-lg text-blue-600">Efficiency</b>
      <p className="text-gray-700 mt-2">
        Streamlined appointment scheduling that fits into your busy lifestyle.
      </p>
    </div>

    {/* Convenience */}
    <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200">
      <b className="text-lg text-blue-600">Convenience</b>
      <p className="text-gray-700 mt-2">
        Access to a network of trusted healthcare professionals in your area.
      </p>
    </div>

    {/* Personalization */}
    <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200">
      <b className="text-lg text-blue-600">Personalization</b>
      <p className="text-gray-700 mt-2">
        Tailored recommendations and reminders to help you stay on top of your health.
      </p>
    </div>

  </div>
</div>


    </div>
  );
};

export default AboutUs;
