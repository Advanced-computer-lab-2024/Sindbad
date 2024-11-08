export const hotelBooking = {
  fields: [
    {
      name: "guests",
      type: "objectArray",
      label: "Guests",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title",
        },
        {
          name: "firstName",
          type: "text",
          label: "First Name",
        },
        {
          name: "lastName",
          type: "text",
          label: "Last Name",
        },
        {
          name: "phone",
          type: "text",
          label: "Phone Number",
        },
        {
          name: "email",
          type: "text",
          label: "Email",
        }
      ]
    },
    {
      name: "payment",
      type: "object",
      label: "Payment",
      fields: [
        {
          name: "method",
          type: "select",
          label: "Payment Method",
          options: ["CREDIT_CARD", "DEBIT_CARD", "PAYPAL"]
        },
        {
          name: "paymentCard",
          type: "object",
          label: "Payment Card",
          fields: [
            {
              name: "vendorCode",
              type: "text",
              label: "Vendor Code",
            },
            {
              name: "cardNumber",
              type: "text",
              label: "Card Number",
            },
            {
              name: "expiryDate",
              type: "text",
              label: "Expiry Date",
            },
            {
              name: "holderName",
              type: "text",
              label: "Card Holder Name",
            }
          ]
        }
      ]
    }
  ],
  defaultValues: {
    guests: [
      {
        title: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
      }
    ],
    payment: {
      method: "",
      paymentCard: {
        vendorCode: "",
        cardNumber: "",
        expiryDate: "",
        holderName: ""
      }
    }
  }
};
