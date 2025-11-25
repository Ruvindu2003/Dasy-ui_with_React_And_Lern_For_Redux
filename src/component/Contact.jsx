import React, { useState, useEffect } from "react";

const Contact = () => {
  const validators = {
    required: (value) => (value ? null : "This field is required"),
    email: (value) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? null
        : "Invalid email address",
    minLen: (len) => (value) =>
      value && value.length >= len
        ? null
        : `Must be at least ${len} characters`,
  };

  const totalSteps = 4;

  const [step, setStep] = useState(1);
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("formData");
    return saved ? JSON.parse(saved) : {};
  });
  const [errors, setErrors] = useState({});
  const [complete, setComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(data));
  }, [data]);

  const handleChange = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const validateStep = (s = step) => {
    const e = {};

    if (s === 1) {
      e.fullName = validators.required(data.fullName);
      e.email =
        validators.required(data.email) || validators.email(data.email);
    }

    if (s === 2) {
      e.message =
        validators.required(data.message) ||
        validators.minLen(10)(data.message);
    }

    setErrors(e);
    return Object.values(e).every((v) => v === null);
  };

  const next = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const submitForm = () => {
    if (!validateStep()) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setComplete(true);
      console.log("Form submitted:", data);
    }, 1000);
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="card bg-base-200 shadow-xl w-full max-w-lg p-6">
        {/* Progress */}
        <ul className="steps mb-6">
          <li className={`step ${step >= 1 && "step-primary"}`}>Info</li>
          <li className={`step ${step >= 2 && "step-primary"}`}>Message</li>
          <li className={`step ${step >= 3 && "step-primary"}`}>Review</li>
          <li className={`step ${step >= 4 && "step-primary"}`}>Submit</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Step {step} of {totalSteps}
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <label className="form-control w-full">
              <span className="label-text font-semibold">Full Name</span>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.fullName && "input-error"
                }`}
                value={data.fullName || ""}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
              <small className="text-red-500">{errors.fullName}</small>
            </label>

            <label className="form-control w-full mt-4">
              <span className="label-text font-semibold">Email</span>
              <input
                type="email"
                className={`input input-bordered w-full ${
                  errors.email && "input-error"
                }`}
                value={data.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <small className="text-red-500">{errors.email}</small>
            </label>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <label className="form-control">
              <span className="label-text font-semibold">Message</span>
              <textarea
                className={`textarea textarea-bordered h-28 ${
                  errors.message && "textarea-error"
                }`}
                value={data.message || ""}
                onChange={(e) => handleChange("message", e.target.value)}
              ></textarea>
              <small className="text-red-500">{errors.message}</small>
            </label>
          </div>
        )}

        {/* STEP 3: REVIEW */}
        {step === 3 && (
          <div className="space-y-3">
            <p><strong>Name:</strong> {data.fullName}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Message:</strong> {data.message}</p>
          </div>
        )}

        {/* STEP 4: COMPLETED */}
        {step === 4 && (
          <div className="text-center py-6">
            {complete ? (
              <h2 className="text-xl font-bold text-green-500">
                🎉 Form Submitted Successfully!
              </h2>
            ) : (
              <div>
                <p className="mb-4">Ready to submit your details?</p>
                <button
                  className={`btn btn-primary w-full ${
                    submitting && "btn-disabled"
                  }`}
                  onClick={submitForm}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button className="btn" onClick={prev}>
              Back
            </button>
          )}

          {step < 4 && (
            <button className="btn btn-primary" onClick={next}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
