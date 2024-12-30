"use client";
import { useJsApiLoader } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import React, { useEffect, useRef, useState } from "react";
import { PhoneInput, PhoneInput2 } from "@/components/form/input";

const libraries = ["places"];

const PartnershipForm = () => {
  const router = useRouter();
  const placeAutoComplete = useRef(null);

  const [autoComplete, setAutoComplete] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    website: "",
    typeOfBusiness: "",
    location: "",
    businessDescription: "",
    partnershipReason: "",
    existingIntegrations: "",
    partnershipModel: "",
    estimatedListings: "",
    apiAccess: "",
    digitalTools: "",
    businessLicense: "",
    compliance: "",
    additionalComments: "",
    agreement: false,
  });

  const [errors, setErrors] = useState({});

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_URL,
    libraries: libraries,
  });

  useEffect(() => {
    if (!isLoaded) return;

    const gAutoComplete = new window.google.maps.places.Autocomplete(
      placeAutoComplete.current,
      {
        types: ["geocode"],
        fields: ["address_components", "formatted_address", "geometry", "name"],
        componentRestrictions: { country: "us" },
      }
    );
    setAutoComplete(gAutoComplete);
  }, [isLoaded]);

  useEffect(() => {
    if (!autoComplete) return;
    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      const position = place.geometry.location;

      if (position) {
        const latitude = position.lat();
        const longitude = position.lng();
        // setLocation({ latitude, longitude });
      }

      setFormData((prev) => ({
        ...prev,
        location: place.formatted_address,
      }));
    });
  }, [autoComplete]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required.";
    if (!formData.businessName.trim())
      errors.businessName = "Business name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "A valid email is required.";
    if (!formData.phone.trim() || !/^\d+$/.test(formData.phone))
      errors.phone = "Phone number must contain only digits.";
    if (!formData.website.trim() || !formData.website.trim().endsWith(".com"))
      errors.website = "Website must end with '.com'.";
    if (!formData.typeOfBusiness)
      errors.typeOfBusiness = "Please select a type of business.";
    if (!formData.location.trim())
      errors.location = "Location of operations is required.";
    if (!formData.businessDescription.trim())
      errors.businessDescription = "Business description is required.";
    if (!formData.partnershipReason.trim())
      errors.partnershipReason = "Please explain why you want to partner.";
    if (!formData.partnershipModel)
      errors.partnershipModel = "Select a partnership model.";
    if (!formData.estimatedListings.trim())
      errors.estimatedListings = "Estimated volume is required.";
    if (!formData.compliance)
      errors.compliance = "Please indicate compliance with regulations.";
    // if (!formData.agreement)
    //   errors.agreement = "You must agree to the submission terms.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (!errors) return;

    console.log("Form Submitted", formData);

    if (!formData.agreement) {
      toast.error("You must agree to the submission terms.");
      return;
    }

    toast.success("Form submitted successfully!");

    setFormData({
      fullName: "",
      businessName: "",
      email: "",
      phone: "",
      website: "",
      typeOfBusiness: "",
      location: "",
      businessDescription: "",
      partnershipReason: "",
      existingIntegrations: "",
      partnershipModel: "",
      estimatedListings: "",
      apiAccess: "",
      digitalTools: "",
      businessLicense: "",
      compliance: "",
      additionalComments: "",
      agreement: false,
    });

    router.push("/");

    // if (validateForm()) {
    //   console.log("Form Submitted", formData);
    //   alert("Form submitted successfully!");
    // }
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#F3F4F6]">
      <h1 className="text-2xl font-bold mb-6">Partnership Inquiry Form</h1>
      <p className="text-gray-600 mb-8">
        Please fill out the form below to submit your partnership request.
        We&apos;ll review your application and get back to you with relevant
        opportunities.
      </p>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business/Organization Name
              </label>
              <input
                type="text"
                name="businessName"
                id="businessName"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.businessName}
                onChange={handleInputChange}
              />
              {errors.businessName && (
                <p className="text-red-600 text-sm">{errors.businessName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              {/* <input
                name="phone"
                type="tel"
                id="phone"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.phone}
                onChange={handleInputChange}
              /> */}
              <PhoneInput2
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
              />
              {errors.phone && (
                <p className="text-red-600 text-sm">{errors.phone}</p>
              )}
            </div>
            <div className="block  mb-1">
              <label className="block mb-2">Website (if applicable)</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <span className="px-3 bg-gray-100 text-gray-500 border-r border-gray-300">
                  http://
                </span>
                <input
                  type="text"
                  name="website"
                  placeholder="Enter your link"
                  className="flex-1 p-2 focus:outline-none focus:ring-2 focus:ring-black rounded-r-lg"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>
              {errors.website && (
                <p className="text-red-600 text-sm">{errors.website}</p>
              )}
            </div>
          </div>
        </section>

        {/* Partnership Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Type of Business
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={formData.typeOfBusiness}
              onChange={handleInputChange}
              name="typeOfBusiness"
            >
              <option value="">Select a type of business</option>
              <option value="tech">Tech</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
            </select>
            {errors.typeOfBusiness && (
              <p className="text-red-600 text-sm">{errors.typeOfBusiness}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Location of Operations
            </label>
            <input
              type="text"
              ref={placeAutoComplete}
              placeholder="Enter your location of operations"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={formData.location}
              onChange={handleInputChange}
              name="location"
            />
            <small className="text-gray-500">
              Please specify the geographical regions where your business
              operates
            </small>
            {errors.location && (
              <p className="text-red-600 text-sm">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Describe Your Business/Services
            </label>
            <textarea
              placeholder="Enter your business/service brief"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={formData.businessDescription}
              onChange={handleInputChange}
              name="businessDescription"
            ></textarea>

            {errors.businessDescription && (
              <p className="text-red-600 text-sm">
                {errors.businessDescription}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Why Do You Want to Partner with P33R?
            </label>
            <textarea
              placeholder="Enter your thought"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={formData.partnershipReason}
              onChange={handleInputChange}
              name="partnershipReason"
            ></textarea>
            <small className="text-gray-500">
              How do you envision your business benefiting from a partnership
              with P33R?
            </small>
            {errors.partnershipReason && (
              <p className="text-red-600 text-sm">{errors.partnershipReason}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Existing Integrations/Platforms
            </label>
            <input
              type="text"
              placeholder="Enter your integration"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={formData.existingIntegrations}
              onChange={handleInputChange}
              name="existingIntegrations"
            />
            <small className="text-gray-500">
              Are you currently integrated with platforms like Airbnb, Turo,
              VRBO, etc.?
            </small>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-6">
          Partnership Preferences
        </h2>

        {/* Partnership Preferences */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Preferred Partnership Model
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={formData.partnershipModel}
              onChange={handleInputChange}
              name="partnershipModel"
            >
              <option>
                Please select the type of partnership you are interested in
              </option>
              <option value="AWIN">AWIN</option>
              <option value="CJ">CJ</option>
              <option value="IMPACT">IMPACT</option>
              <option value="TRAVELPAYS">TRAVELPAYS</option>
            </select>
            {errors.partnershipModel && (
              <p className="text-red-600 text-sm">{errors.partnershipModel}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Estimated Volume of Listings
            </label>
            <input
              type="text"
              placeholder="Enter your estimated volume of listings"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={formData.estimatedListings}
              onChange={handleInputChange}
              name="estimatedListings"
            />
            {errors.estimatedListings && (
              <p className="text-red-600 text-sm">{errors.estimatedListings}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Do You Require API Access?
            </label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="apiAccess"
                  value="yes"
                  className="mr-2"
                  onClick={() => setFormData({ ...formData, apiAccess: "yes" })}
                  checked={formData.apiAccess === "yes"}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="apiAccess"
                  value="no"
                  className="mr-2"
                  onClick={() => setFormData({ ...formData, apiAccess: "no" })}
                  checked={formData.apiAccess === "no"}
                />{" "}
                No
              </label>
              <label>
                <input
                  type="radio"
                  name="apiAccess"
                  value="unsure"
                  className="mr-2"
                  onClick={() =>
                    setFormData({ ...formData, apiAccess: "unsure" })
                  }
                  checked={formData.apiAccess === "unsure"}
                />{" "}
                Unsure (Need more information)
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Do You Have Existing Digital Tools/Integrations (APIs, SDKs,
              etc.)?
            </label>
            <input
              type="text"
              placeholder="Enter your integration"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={formData.digitalTools}
              onChange={handleInputChange}
              name="digitalTools"
            />
            <small className="text-gray-500">
              If yes, please provide details about your current integrations
            </small>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-6">Legal & Compliance</h2>

        {/* Legal & Compliance */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Business License Number (if applicable)
            </label>
            <input
              type="text"
              placeholder="Enter your business license number"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={formData.businessLicense}
              onChange={handleInputChange}
              name="businessLicense"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Are You Compliant with All Relevant Local and National
              Regulations?
            </label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="compliance"
                  value="yes"
                  className="mr-2"
                  onClick={() =>
                    setFormData({ ...formData, compliance: "yes" })
                  }
                  checked={formData.compliance === "yes"}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="compliance"
                  value="no"
                  className="mr-2"
                  onClick={() => setFormData({ ...formData, compliance: "no" })}
                  checked={formData.compliance === "no"}
                />{" "}
                No
              </label>
              <label>
                <input
                  type="radio"
                  name="compliance"
                  value="unsure"
                  className="mr-2"
                  onClick={() =>
                    setFormData({ ...formData, compliance: "unsure" })
                  }
                  checked={formData.compliance === "unsure"}
                />{" "}
                Unsure (Need assistance)
              </label>
            </div>
            {errors.compliance && (
              <p className="text-red-600 text-sm">{errors.compliance}</p>
            )}
          </div>
        </div>

        {/* Legal & Compliance */}

        {/* Additional Information */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
          <div>
            <label
              htmlFor="additionalInfo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Additional Comments or Questions
            </label>
            <textarea
              id="additionalInfo"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter any additional comments or questions"
              value={formData.additionalComments}
              onChange={handleInputChange}
              name="additionalComments"
            />
            <small className="text-gray-500">
              Is there anything else you would like us to know about your
              business or partnership proposal?
            </small>
          </div>
        </section>

        {/* Submission Agreement */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Submission Agreement</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreement"
                className="mt-1 mr-2"
                checked={formData.agreement}
                onChange={handleInputChange}
                name="agreement"
              />
              <label htmlFor="agreement" className="text-sm text-gray-600">
                By submitting this form, you agree to be contacted by P33R
                regarding potential partnership opportunities. We respect your
                privacy and will only use the information provided for
                partnership inquiries.
              </label>
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PartnershipForm;
