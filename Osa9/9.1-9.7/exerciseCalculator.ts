interface ExerciseGoals {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ExerciseValues {
  exercise: Array<number>,
  target: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseArgumentsPost = (daily_exercises: Array<any>, target: any) => {
  if (isNaN(Number(target))) {
    throw new Error('Target was not a number');
  }

  daily_exercises.forEach(day => {
    if (isNaN(Number(day))) {
      throw new Error('Exercise value was not a number');
    }
  });

  return {
    daily_exercisesNum: daily_exercises.map(day => Number(day)),
    targetNum: Number(target)
  };
};

const parseArgumentsCLI = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) {
    throw new Error("Too few arguments");
  }

  const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error("Target was not a number");
  }

  const exercises = args.slice(3);
  const exerciseValues = exercises.map(exerciseValue => Number(exerciseValue));
  exerciseValues.forEach(exerciseValue => {
    if (isNaN(exerciseValue)) {
      throw new Error("Exercise value not a number");
    }
  });

  return {
    exercise: exerciseValues,
    target: target
  };
};

//target represents the goal for average exercise/day
export const calculateExercises = (dailyExercise: Array<number>, target: number): ExerciseGoals => {
  const periodLength = dailyExercise.length;
  const trainingDays = dailyExercise.filter(day => day > 0).length;
  const trainingTotal = dailyExercise.reduce((prevValue, curValue) => prevValue + curValue, 0);
  const averageTraining = trainingTotal / periodLength;
  let success = false;
  let rating = -1;
  let ratingDescription = 'default description';

  switch (true) {
    case (averageTraining >= target):
      success = true;
      rating = 3;
      ratingDescription = "Great! You achieved your target!";
      break;
    case (averageTraining >= target / 2):
      success = false;
      rating = 2;
      ratingDescription = "You almost achieved your target!";
      break;
    case (averageTraining < target / 2):
      success = false;
      rating = 1;
      ratingDescription = "Your target was left unachieved this time.";
      break;
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageTraining
  };
};

try {
  const { exercise, target } = parseArgumentsCLI(process.argv);
  console.log(calculateExercises(exercise, target));
} catch (error) {
  console.log(error);
}