declare interface HealthHistory {
  _id: string;
  name: string;
  userId: string;
  createdAt: Date;
  lastUpdatedAt: Date;

  firstName: string;
  lastName: string;
  email: string;
  emailFreq: string;
  age: number;
  height: string;
  dateOfBirth: string;
  placeOfBirth: string;
  homePhone: string;
  workPhone: string;
  mobilePhone: string;
  weightCurrent: string;
  weightSixMonths: string;
  weightOneYear: string;
  weightDiffPref: string;
  weightDiffReason: string;

  relationshipStatus: string;
  whereDoYouLive: string;
  anyChildren: string;
  anyPets: string;
  occupation: string;
  hoursWorkPerWeek: string;

  mainHealthConcerns: string;
  otherHealthConcerns: string;
  pointFeltBest: string;
  currentSeriousIllnesses: string;
  mothersHealth: string;
  fathersHealth: string;
  ancestry: string;
  bloodType: string;
  sleepQuality: string;
  sleepDuration: number;
  sleepWaking: string;
  painStiffnessOrSwelling: string;
  digestiveHealth: string;
  allergiesOrSensitivities: string;

  periodsRegular: string;
  flowDays: number;
  periodFreq: string;
  periodPains: string;
  reachedMenopause: string;
  birthControlHistory: string;
  infections: string;

  supplimentsOrMedications: string;
  healersOrTherapies: string;
  sportsAndExercise: string;

  peerSupport: string;
  doYouCook: string;
  percentageHomeCooking: string;
  nonHomeCookedMeals: string;

  childhoodDietBreakfast1: string;
  childhoodDietLunch1: string;
  childhoodDietDinner1: string;
  childhoodDietSnacks1: string;
  childhoodDietLiquids1: string;

  childhoodDietBreakfast2: string;
  childhoodDietLunch2: string;
  childhoodDietDinner2: string;
  childhoodDietSnacks2: string;
  childhoodDietLiquids2: string;

  childhoodDietBreakfast3: string;
  childhoodDietLunch3: string;
  childhoodDietDinner3: string;
  childhoodDietSnacks3: string;
  childhoodDietLiquids3: string;

  currentDietBreakfast1: string;
  currentDietLunch1: string;
  currentDietDinner1: string;
  currentDietSnacks1: string;
  currentDietLiquids1: string;

  currentDietBreakfast2: string;
  currentDietLunch2: string;
  currentDietDinner2: string;
  currentDietSnacks2: string;
  currentDietLiquids2: string;

  currentDietBreakfast3: string;
  currentDietLunch3: string;
  currentDietDinner3: string;
  currentDietSnacks3: string;
  currentDietLiquids3: string;

  addictions: string;
  priorityDietChange: string;
  additionalComments: string;
}
