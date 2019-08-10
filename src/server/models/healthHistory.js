const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const healthHistorySchema = new mongoose.Schema({
  name: String,
  userId: ObjectId,
  createdAt: Date,
  lastUpdatedAt: Date,

  firstName: String,
  lastName: String,
  email: String,
  emailFreq: String,
  age: Number,
  height: String,
  dateOfBirth: String,
  placeOfBirth: String,
  homePhone: String,
  workPhone: String,
  mobilePhone: String,
  weightCurrent: String,
  weightSixMonths: String,
  weightOneYear: String,
  weightDiffPref: String,
  weightDiffReason: String,

  relationshipStatus: String,
  whereDoYouLive: String,
  anyChildren: String,
  anyPets: String,
  occupation: String,
  hoursWorkPerWeek: String,

  mainHealthConcerns: String,
  otherHealthConcerns: String,
  pointFeltBest: String,
  currentSeriousIllnesses: String,
  mothersHealth: String,
  fathersHealth: String,
  ancestry: String,
  bloodType: String,
  sleepQuality: String,
  sleepDuration: Number,
  sleepWaking: String,
  painStiffnessOrSwelling: String,
  digestiveHealth: String,
  allergiesOrSensitivities: String,

  periodsRegular: String,
  flowDays: Number,
  periodFreq: String,
  periodPains: String,
  reachedMenopause: String,
  birthControlHistory: String,
  infections: String,

  supplimentsOrMedications: String,
  healersOrTherapies: String,
  sportsAndExercise: String,

  peerSupport: String,
  doYouCook: String,
  percentageHomeCooking: String,
  nonHomeCookedMeals: String,

  childhoodDietBreakfast1: String,
  childhoodDietLunch1: String,
  childhoodDietDinner1: String,
  childhoodDietSnacks1: String,
  childhoodDietLiquids1: String,

  childhoodDietBreakfast2: String,
  childhoodDietLunch2: String,
  childhoodDietDinner2: String,
  childhoodDietSnacks2: String,
  childhoodDietLiquids2: String,

  childhoodDietBreakfast3: String,
  childhoodDietLunch3: String,
  childhoodDietDinner3: String,
  childhoodDietSnacks3: String,
  childhoodDietLiquids3: String,

  currentDietBreakfast1: String,
  currentDietLunch1: String,
  currentDietDinner1: String,
  currentDietSnacks1: String,
  currentDietLiquids1: String,

  currentDietBreakfast2: String,
  currentDietLunch2: String,
  currentDietDinner2: String,
  currentDietSnacks2: String,
  currentDietLiquids2: String,

  currentDietBreakfast3: String,
  currentDietLunch3: String,
  currentDietDinner3: String,
  currentDietSnacks3: String,
  currentDietLiquids3: String,

  addictions: String,
  priorityDietChange: String,
  additionalComments: String
});

healthHistorySchema.pre("save", function(next) {
  let now = Date.now();

  // Generate dates
  this.lastUpdatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});

healthHistorySchema.pre("updateOne", function(next) {
  this.lastUpdatedAt = Date.now();
  next();
});

module.exports = mongoose.model("HealthHistory", healthHistorySchema);
