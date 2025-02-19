import React, { useContext, useState } from "react";
import { useTheme } from "../../Context/ThemeContext";

const Faqs = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Can I apply for multiple scholarships at the same time?",
      answer:
        "Yes, you can apply for multiple scholarships, provided you meet the eligibility criteria for each.",
    },
    {
      question: "How can I track the status of my scholarship application?",
      answer:
        "Log in to your account and navigate to the 'Application Status' section to see updates on your submitted applications.",
    },
    {
      question: "Are there scholarships available for international students?",
      answer:
        "Yes, some scholarships are specifically designed for international students. Check the eligibility criteria on each scholarship's details page.",
    },
    {
      question: "When will I receive the scholarship funds?",
      answer:
        "Scholarship disbursement timelines vary by program. Typically, funds are released after the verification process is completed.",
    },
    {
      question: "What should I do if my application is rejected?",
      answer:
        "Review the rejection reasons provided and consider applying for other scholarships where you meet the eligibility criteria.",
    },
    {
      question: "Is there an age limit for applying to scholarships?",
      answer:
        "Age limits, if any, vary depending on the scholarship. Refer to the specific eligibility criteria for details.",
    },
  ];

  return (
    <section
      className={` mt-5 ${theme ? "bg-transparent" : "bg-white"} mb-12 pt-10`}
    >
      <div className="container mx-auto px-4 w-11/12 lg:w-4/5">
        <h2 className="text-3xl font-bold text-center  mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className={` shadow-md rounded-md p-4`}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left  font-medium focus:outline-none"
              >
                <span>{faq.question}</span>
                <span className="ml-2 ">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <p
                  className={`mt-2 ${
                    theme ? "text-white/60 " : "text-gray-600"
                  }`}
                >
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
