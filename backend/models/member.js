//"use strict";
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: { //שלא יכלול מספרים
    type: String,
  },
  id: { //9 ספרות ולא אותיות
    type: String,
    required: [true,'id is necessary'],
    unique: true
  },
  address:{
    type: String,
  },
  sickDate: {
    type: Date
  }
  // ,
  // dateOfBirth:{ // לא יותר מ120 שנים מתאריך היום
  //    type: Date,
   
  // }
  //,
  // telephone: { // 9 ספרות ולא אותיות
  //   type: String,
  //   validate: {
  //     validator: function(){

  //     }
  //   }
  // },
  // celephone: { //10 ספרות ולא אותיות
  //   type: String,
  // },
  // vaccinations: {type: [ // עד 4 פעמים-גודל מערך 4
  //   {
  //     dates:
  //     {
  //       type: Date
  //     }},{

  //     manufacturer:
  //     {
  //       type: String,
  //       enum:['Pfizer', 'Moderna']
  //     }
  //   }],
  //   max:[4,'4 vaccinations are available']
  // },
  // // vaccinationsTimes: {
  // //   type: Array[Date]
  // // },
  // // manufacturer: {
  // //   type: Array[Date]
  // // }
 
  //,
  // wasSick:{
  //   type:String
  // }
  //,
  // recoveryDate: {
  //   type: Date
  // }

});

memberSchema.path('id').validate(function (v){
  return v.length != 9;
},'must 9 digits');

module.exports = mongoose.model("member", memberSchema );
