import { countryCodes } from "@/utilities/countryCodes";
import countries from "@/utilities/countries";

export const flightBookingFields = {
  fields: [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      required: true,
    },
    {
      name: "gender",
      type: "select",
      label: "Gender",
      options: [ "MALE", "FEMALE", "UNSPECIFIED", "UNDISCLOSED" ],
      required: true,
    },
    {
      name: "email",
      type: "text",
      label: "Email",
      required: true,
    },
    {
      name: "dateOfBirth",
      type: "dateText",
      label: "Date of Birth",
      required: true,
    },
    {
      name: "countryCallingCode",
      type: "text",
      label: "Country Calling Code",
      required: true,
    },
    {
      name: "phoneNumber",
      type: "text",
      label: "Phone Number",
      required: true,
    },
    {
      name: "birthPlace",
      type: "select",
      options: (countries.map((country) => country.value)),
      label: "Birth Place",
      required: true,
    },
    {
      name: "passportIssuanceLocation",
      type: "select",
      options: (countries.map((country) => country.value)),
      label: "Passport Issuance Location",
      required: true,
    },
    {
      name: "passportIssuanceDate",
      type: "dateText",
      label: "Passport Issuance Date",
      required: true,
    },
    {
      name: "passportNumber",
      type: "text",
      label: "Passport Number",
      required: true,
    },
    {
      name: "passportExpiryDate",
      type: "dateText",
      label: "Passport Expiry Date",
      required: true,
    },
    {
      name: "passportIssuanceCountry",
      type: "select",
      options: (countryCodes.map((country) => country.value)),
      label: "Passport Issuance Country",
      required: true,
    },
    {
      name: "nationality",
      type: "select",
      options: (countryCodes.map((country) => country.value)),
      label: "Nationality",
      required: true,
    },
  ],
  defaultValues: {
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    dateOfBirth: "",
    countryCallingCode: "",
    phoneNumber: "",
    birthPlace: "",
    passportIssuanceLocation: "",
    passportIssuanceDate: "",
    passportNumber: "",
    passportExpiryDate: "",
    passportIssuanceCountry: "",
    nationality: "",
  },
};