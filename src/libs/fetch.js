export default async function fetchQuestion(setData, setAnswers) {
  const fetchResponse = await fetch(
    'https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple',
    {
      method: 'GET',
    }
  );
  //Store the response.
  const response = await fetchResponse.json();
  setData(response.results);

  //Store the answers
  const answersArrayFlatted = flatAnswerArray(
    response.results[0].correct_answer,
    response.results[0].incorrect_answers
  );
  const answersArray = shuffle(answersArrayFlatted);
  setAnswers(answersArray);
}

//Flat the answer Array
function flatAnswerArray(rightAnswer, wrongAnswers) {
  return [rightAnswer, wrongAnswers].flat();
}

//Shuffle the answersArray using Fisher Yates algorithm
function shuffle(answers) {
  let j, x, i;
  for (i = answers.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = answers[i];
    answers[i] = answers[j];
    answers[j] = x;
  }
  return answers;
}
