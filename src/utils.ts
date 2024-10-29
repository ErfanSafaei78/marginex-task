export const generateHash = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let hash = "";
  for (let i = 0; i < 5; i++) {
    hash += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return hash;
};

export const formatEstimate = (hours: number): string => {
  const units = [
    { unit: "mo", hours: 160 },
    { unit: "w", hours: 40 },
    { unit: "d", hours: 8 },
    { unit: "h", hours: 1 },
  ];

  // Handle special cases
  if (hours === 0) return "0h";
  if (hours < 0) return "Invalid";

  let result = "";
  let remainingHours = hours;

  for (const { unit, hours: unitHours } of units) {
    if (remainingHours >= unitHours) {
      const value = Math.floor(remainingHours / unitHours);
      result += `${value}${unit} `;
      remainingHours %= unitHours;
    }
  }

  return result.trim();
};

export const toPascalCase = (str: string) => str[0].toUpperCase() + str.slice(1).toLowerCase();