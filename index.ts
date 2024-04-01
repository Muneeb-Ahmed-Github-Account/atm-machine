#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 49000;
let myPin = 1212;


// welcome message for consumer
console.log(chalk.blue("\n \tDear, Consumer Welcome to ATM Machaine!\n"));

let userAnswer = await inquirer.prompt([
  {
     message: chalk.yellow("Please enter your pin:"),
     type: "number",
     name: "userPin",
  }
])
if (userAnswer.userPin === myPin) {
  console.log(chalk.green("\nPin is Correct, Login Succesfully!\n"));

  
  let operationAns = await inquirer.prompt([
        {
            message: chalk.cyanBright("Please select option:"),
            type: "list",
            name: "operation",
            choices: ["Withdraw Amount", "Check balance"]
        }
    ]);

    if(operationAns.operation === "Withdraw Amount"){
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.cyanBright("Select a withdraw method"),
                choices: ['Fast Cash', 'Enter Amount']
            }
        ])
        if(withdrawAns.withdrawMethod === 'Fast Cash'){
            let fastcashAns = await inquirer.prompt([
                 {
                     name: "FastCash",
                     type: "list",
                     message: "Select Amount:",
                     choices: [1000,2000,5000,10000,20000,30000,50000]

                 }
            ])
            if(fastcashAns.FastCash > myBalance ){
              console.log(chalk.red("Sorry, insufficient balance."));
            }
            else{
              myBalance -= fastcashAns.FastCash
              console.log(`${fastcashAns.FastCash} Succesfully Withdraw !`);
              console.log(`Your remaining balance is: ${myBalance}`)
            }
        }
 
       else if(withdrawAns.withdrawMethod === 'Enter Amount') {
          let usrAmount = await inquirer.prompt([
            {
                message: "Enter the amount to withdraw :",
                type: "number",
                name: "amount",
            }
         ])
         if(usrAmount.amount > myBalance ){
             console.log(chalk.red("insufficient balance"));
         }
         else{
            myBalance -= usrAmount.amount
            console.log(`${usrAmount.amount} Withdraw succesfully`);
            console.log(`your remaining balance is: ${myBalance}`);
         }
        }
      }
     
     else if(operationAns.operation === "Check balance"){
      console.log(`Your Account Balance is: ${myBalance}`);
    }
}
else{
      console.log(chalk.redBright("your pin is invalid, Try Again!"));
}








