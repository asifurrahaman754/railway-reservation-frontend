export const paymentMethods = [
  {
    label: "Bkash",
    value: "bkash",
    image: "/assets/images/bkash.webp",
    instruction: [
      {
        lable: "Payment Instruction using Bkash App",
        steps: [
          "Open Bkash App",
          "Select Send Money",
          "Enter Sender Bkash Number: +9999999",
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
  {
    label: "Nagad",
    value: "nagad",
    image: "/assets/images/nagad.svg",
    instruction: [
      {
        lable: "Payment Instruction using Nagad App",
        steps: [
          "Open Nagad App",
          "Select Send Money",
          "Enter Sender Nagad Number: +9999999",
          "Enter Amount",
          "Enter Reference Number",
          "Enter your Nagad PIN to confirm",
        ],
      },
      {
        lable: "Payment Instruction using USSD Dialing",
        steps: [
          "Dial *167#",
          "Choose 'Send Money'",
          "Enter Sender Nagad Number",
          "Enter Amount",
          "Enter Reference Number",
          "Enter your Nagad PIN to confirm",
        ],
      },
    ],
  },
];
