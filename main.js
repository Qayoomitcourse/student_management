import inquirer from "inquirer";
// Generate a random student ID
const studentID = Math.floor(10000 + Math.random() * 9000);
// Initialize balance
let myBalance = 0;
// Prompt for student name and course selection
let answers = await inquirer.prompt([
    {
        name: "StudentName",
        type: "input",
        message: "Please enter Student Name",
        validate: function (Ans) {
            if (Ans.trim() !== "") {
                return true;
            }
            return "Please enter a valid name";
        },
    },
    {
        name: "Course",
        type: "list",
        message: "Please Select a Course ",
        choices: ["MS Office", "HTML", "Javascript", "TypeScript", "Python"],
    },
]);
// Course fee lookup object
let CourseFee = {
    "MS Office": 2000,
    "HTML": 3000,
    "Javascript": 5000,
    "TypeScript": 10000,
    "Python": 15000,
};
// Display course fee and initial balance
console.log(`Course Fees is ${CourseFee[answers.Course]}`);
console.log(`Balance ${myBalance}`);
// Prompt for payment method and amount
const paymentType = await inquirer.prompt([
    {
        name: "Payment",
        type: "list",
        message: "Please Select your payment Method",
        choices: ["Bank Transfer", "Easy Paisa", "JazCash"],
    },
    {
        name: "amount",
        type: "input",
        message: "Enter amount to transfer",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Enter valid amount";
        },
    },
]);
console.log(`You have selected payment method ${paymentType.Payment}`);
// Calculate remaining balance if payment is enough
const CourseFees = CourseFee[answers.Course];
const paymentAns = parseFloat(paymentType.amount);
let remainingBalance = 0;
if (paymentAns >= CourseFees) {
    // Calculate remaining balance after deducting course fee
    remainingBalance = paymentAns - CourseFees;
    console.log(`You have successfully enrolled in ${answers.Course}`);
    console.log(`Remaining Balance: ${remainingBalance}`);
    // Prompt for next action - check status or exit
    let Results = await inquirer.prompt([
        {
            name: "Select",
            type: "list",
            message: "What would you like to do next? ",
            choices: ["Check Status", "Exit"],
        },
    ]);
    if (Results.Select === "Check Status") {
        console.log("===========Status==========");
        console.log(`Student ID:  ${studentID}`);
        console.log(`Student Name: ${answers.StudentName}`);
        console.log(`Course Name : ${answers.Course}`);
        console.log(`Course Fee : ${CourseFee[answers.Course]}`);
        console.log(`Your Initial Balance ${myBalance}`);
        console.log(`Money Transfer ${paymentType.amount} by ${paymentType.Payment}`);
        console.log(`Remaining Balance : ${remainingBalance}`);
    }
    else {
        console.log(`Exiting the Student Management System`);
    }
}
else {
    console.log(`Sorry! You have not provided enough amount to enroll in the Course ${answers.Course}`);
}
