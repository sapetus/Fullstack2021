export { };

interface BmiValues {
  weight: number,
  height: number
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = Number((weight / (height / 100) ** 2).toFixed(1));

  switch (true) {
    case (bmi < 18.5):
      return `BMI: ${bmi}, underweight`;
    case (bmi >= 18.5 && bmi < 25):
      return `BMI: ${bmi}, normalweight`;
    case (bmi >= 25):
      return `BMI: ${bmi}, overweight`;
    default:
      return `BMI could not be calculated`;
  }
};

const parseArgumentsURL = (height: string, weight: string) => {
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      weight: Number(weight),
      height: Number(height)
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

const parseArgumentsCLI = (args: Array<string>): BmiValues => {
  if (args.length < 4) {
    throw new Error("Too few arguments");
  }
  if (args.length > 4) {
    throw new Error("Too many arguments");
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[3]),
      height: Number(args[2])
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

try {
  const { weight, height } = parseArgumentsCLI(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  console.log(error);
}

export default {
  parseArgumentsURL,
  calculateBmi
};