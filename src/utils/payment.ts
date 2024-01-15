export const paymentMethods = [
  {
    label: "Bkash",
    image: "/assets/images/bkash.webp",
    instruction: [
      {
        lable: "Payment Instruction using Bkash App",
        steps: [
          "Open Bkash App",
          "Select Send Money",
          "Enter Sender Bkash Number",
          "Enter Amount",
          "Enter Reference Number",
          "Enter your Bkash PIN to confirm",
        ],
      },
      {
        lable: "Payment Instruction using USSD Dialing",
        steps: [
          "Dial *247#",
          "Choose 'Send Money'",
          "Enter Sender Bkash Number",
          "Enter Amount",
          "Enter Reference Number",
          "Enter your Bkash PIN to confirm",
        ],
      },
    ],
  },
];
