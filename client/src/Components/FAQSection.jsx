import React, { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-y-5 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/2">
            <img
              src="https://pagedone.io/asset/uploads/1696230182.png"
              alt="FAQ tailwind section"
              className="w-[400px] mx-auto"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-4">
                <h6 className="text-m text-center font-medium lg:text-left">
                  FAQS
                </h6>
                <h2 className="text-2xl text-center font-bold lg:text-left">
                  Looking for answers?
                </h2>
              </div>
              <div className="accordion-group" data-accordion="default-accordion">
                {[
                  { title: "How to create an account?", content: "To create an account, find the 'Sign up' or 'Create account' button, fill out the registration form with your personal information, and click 'Create account' or 'Sign up.' Verify your email address if needed, and then log in to start using the platform." },
                  { title: "Have any trust issue?", content: "Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease." },
                  { title: "How can I reset my password?", content: "Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease." },
                  { title: "What is the payment process?", content: "Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease." },
                ].map((item, index) => (
                  <div key={index} className={`accordion py-5 border-b border-solid border-slate-600 ${activeIndex === index ? "active" : ""}`} id={`basic-heading-${index}`}>
                    <button
                      className="accordion-toggle group inline-flex items-center justify-between text-xl font-normal text-gray-600 w-full transition duration-500 hover:text-indigo-600 accordion-active:text-indigo-600 accordion-active:font-medium"
                      aria-controls={`basic-collapse-${index}`}
                      onClick={() => toggleAccordion(index)}
                    >
                      <h5 className="pb-3">{item.title}</h5>
                      <svg
                        className={`text-gray-900 transition duration-500 group-hover:text-indigo-600 accordion-active:text-indigo-600 ${activeIndex === index ? "rotate-180" : ""}`}
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <div
                      id={`basic-collapse-${index}`}
                      className={`accordion-content w-full px-0 overflow-hidden pr-4 ${activeIndex === index ? "active" : ""}`}
                      style={{ maxHeight: activeIndex === index ? "100px" : "0px" }}
                      aria-labelledby={`basic-heading-${index}`}
                    >
                      <p className="text-base font-normal text-slate-600">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
