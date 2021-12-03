let data = [{ "Gender": "Male", "HeightCm": 171, "WeightKg": 96 }, {
    "Gender": "Male", "HeightCm": 161,
    "WeightKg": 85
}, { "Gender": "Male", "HeightCm": 180, "WeightKg": 77 }, {
    "Gender": "Female",
    "HeightCm": 166, "WeightKg": 62
}, { "Gender": "Female", "HeightCm": 150, "WeightKg": 70 },
{ "Gender": "Female", "HeightCm": 167, "WeightKg": 82 }]

data.forEach(_ => {
    let BMI = calculateBMI(_)
    _.BMI = BMI.toFixed(2)
    _.BMICategory = getBMICategory(BMI)
    _.HealthRisk = getHealthRisk(BMI)
})
console.log(data)
let overWeightCount = getCountByCategory(data, `Overweight`)
console.log(overWeightCount)
function calculateBMI (weightObj) {
    return (weightObj.WeightKg * 100) / weightObj.HeightCm
}

function getBMICategory(BMI){
    if(BMI <= 18.4){
        return `Underweight`
    }else if(BMI >= 18.5 && BMI <=24.9){
        return `Normal weight`
    }else if(BMI >= 25 && BMI <=29.9){
        return `Overweight`
    }else if(BMI >= 30 && BMI <=34.9){
        return `Moderately obese`
    }else if(BMI >= 35 && BMI <=39.9){
        return `Severel obese`
    }else if(BMI >= 40){
        return `Very severely obese`
    }
}

function getHealthRisk(BMI){
    if(BMI <= 18.4){
        return `Malnutrition risk`
    }else if(BMI >= 18.5 && BMI <=24.9){
        return `Low risk`
    }else if(BMI >= 25 && BMI <=29.9){
        return `Enhanced risk`
    }else if(BMI >= 30 && BMI <=34.9){
        return `Medium risk`
    }else if(BMI >= 35 && BMI <=39.9){
        return `High`
    }else if(BMI >= 40){
        return `Very high risk`
    }
}

function getCountByCategory(data, category){
    return data.filter(_ => _.BMICategory == category).length
}