export function integerToWords(number) {
  const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  function convertLessThanOneThousand(n) {
    if (n < 10) return units[n];
    if (n < 20) return teens[n - 10];
    const digit = n % 10;
    return tens[Math.floor(n / 10)] + (digit !== 0 ? "-" + units[digit] : "");
  }

  if (number === 0) return "zero";

  const billion = Math.floor(number / 1000000000);
  const million = Math.floor((number % 1000000000) / 1000000);
  const thousand = Math.floor((number % 1000000) / 1000);
  const remainder = number % 1000;

  let result = "";

  if (billion > 0) {
    result += convertLessThanOneThousand(billion) + " billion ";
  }
  if (million > 0) {
    result += convertLessThanOneThousand(million) + " million ";
  }
  if (thousand > 0) {
    result += convertLessThanOneThousand(thousand) + " thousand ";
  }
  if (remainder > 0) {
    result += convertLessThanOneThousand(remainder);
  }

  // Remove trailing space
  return result.trim();
}

// Function to format the date part of the timestamp (dd/mm/yyyy)
export function formatDate(timestamp) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// Function to format the time part of the timestamp (hh:mm)
export function formatTime(timestamp) {
  const date = new Date(timestamp);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}