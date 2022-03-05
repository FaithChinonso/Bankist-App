"strict mode";

//INPUTS
const inputUser = document.querySelector(".inputs__user");
const inputPin = document.querySelector(".inputs__pin");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputTransferTo = document.querySelector(".form__input--to");
const inputLoanAmount = document.querySelector(".form__input--request");
const inputCloseUser = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//BUTTONS
const btnLogin = document.querySelector(".inputs__button");
const btnTransfer = document.querySelector(".form__button--transfer");
const btnLoan = document.querySelector(".form__button--request");
const btnSort = document.querySelector(".btn--sort");
const btnClose = document.querySelector(".form__button--close");

//DISPLAY
const welcomeMessage = document.querySelector(".welcome");
const balance = document.querySelector(".balance__value");
const balanceDate = document.querySelector(".balance__date");
const movementDate = document.querySelector(".movements__date");
const movementsValue = document.querySelector(".movements__value");
const incomeSummary = document.querySelector(".summary__amount--in");
const expenseSummary = document.querySelector(".summary__amount--out");
const interestSummary = document.querySelector(".summary__amount--interest");
const timer = document.querySelector("logout__timer");
//CONTAINER
const containerMovements = document.querySelector(".movements");
const containerApp = document.querySelector(".app");

const acc1 = {
  user: "Faith Umunnakwe",
  pin: 1111,
  interestRate: 1.2,
  location: "Nigeria",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};
const acc2 = {
  user: "Chioma Umunnakwe",
  pin: 1408,
  interestRate: 1,
  location: "Nigeria",
  movements: [1200, -300, 60, 800, -3000, 750, 1800, -790],
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const acc3 = {
  user: "Chidinma Nwaeze",
  pin: 1509,
  interestRate: 1.5,
  location: "Nigeria",
  movements: [2000, -250, -560, 1800, 705, -700, 872, -790],
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const acc4 = {
  user: "Doris Onyewuchi",
  pin: 1812,
  interestRate: 0.9,
  location: "Nigeria",
  movements: [790, -700, -560, 1800, 3000, 700, 872, 7000],
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const acc5 = {
  user: "Eucharia Ndubuisi",
  pin: 0103,
  interestRate: 1.1,
  location: "Nigeria",
  movements: [200, -300, -560, 800, 3000, 700, 872, -790],
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [acc1, acc2, acc3, acc4, acc5];

//DISPLAY MOVEMENTS
const displayMovements = function (movements, sorted = false) {
  containerMovements.innerHTML = "";
  const movs = sorted ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? "DEPOSIT" : "WITHDRAWAL";

    const HTML = `
        <div class="movement__row">
          <div class="movement__type movement__type--${type}">
            <h5 class="movement__text movement__text--${type}">${
      i + 1
    } ${type}</h5>
            <div class="movements__value">${mov}€</div>
          </div>
        </div>
        `;

    containerMovements.insertAdjacentHTML("afterbegin", HTML);
  });
};

//DISPLAY BALANCE
const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  balance.innerHTML = `${acc.balance} €`;
};

//GET USERNAME
const getUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.user
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
getUsername(accounts);
//DISPLAY SUMMARY
const displaySummary = function (acc) {
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((sum, cur) => sum + cur, 0);
  incomeSummary.textContent = `${income}€`;

  const expense = acc.movements
    .filter((mov) => mov < 0)
    .reduce((sum, cur) => sum + cur, 0);
  expenseSummary.textContent = `${Math.abs(expense)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter(function (int) {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  console.log(Math.trunc(interest));
  interestSummary.textContent = `${
    Math.round((interest + Number.EPSILON) * 100) / 100
  }€`;
};

const updateUI = function (acc) {
  displayMovements(acc.movements);
  displayBalance(acc);
  displaySummary(acc);
};
//IMPLEMENT LOGIN
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === inputUser.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputPin.value)) {
    inputPin.value = inputUser.value = "";
    welcomeMessage.textContent = `Welcome back, ${
      currentAccount.user.split(" ")[0]
    }`;
    containerApp.classList.remove("app__hide");
  }
  updateUI(currentAccount);
});

//IMPLEMENT TRANSFER

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    (acc) => inputTransferTo.value === acc.username
  );
  console.log(recieverAcc);
  inputTransferTo.value = inputTransferAmount.value = "";
  if (
    amount > 0 &&
    recieverAcc &&
    amount <= currentAccount.balance &&
    currentAccount !== recieverAcc
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
  }
  updateUI(currentAccount);
});
//IMPLEMENT LOAN REQUEST

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});
//IMPLEMENT CLOSE OF ACCOUNT
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUser.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === inputCloseUser.value
    );

    accounts.splice(index, 1);
    containerApp.classList.add("app__hide");
    welcomeMessage.textContent = "Log in to get started";

    inputCloseUser.value = inputClosePin.value = "";
  }
});
// ACTIVATE SORT BUTTON
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("click");
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
