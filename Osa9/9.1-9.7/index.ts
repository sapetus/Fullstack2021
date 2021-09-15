import express from 'express';
import bmi from './bmiCalculator';
import { calculateExercises, parseArgumentsPost } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

//Errors in console happen due to bmiCalculator file also containing the files for 
//running it through command line, these do not have any affect
app.get('/bmi', (req, res) => {
  const heightParam = req.query.height as string;
  const weightParam = req.query.weight as string;

  try {
    const { weight, height } = bmi.parseArgumentsURL(heightParam, weightParam);
    const bmiString = bmi.calculateBmi(height, weight);

    res.send({
      weight: weight,
      height: height,
      bmi: bmiString
    });
  } catch (error) {
    res.send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  //eslint-disable-next-line
  const { daily_exercises, target } = req.body;
  
  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
  }

  try {
    const { daily_exercisesNum, targetNum } = parseArgumentsPost(daily_exercises, target);
    const result = calculateExercises(daily_exercisesNum, targetNum);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: 'malformatted parameters ' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});