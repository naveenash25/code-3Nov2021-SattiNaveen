const express = require('express')
const app = express()
const port = 3000

app.get('/bmi', (req, res) => {
    try {
        let BMIdata = formatData(data)
        res.status(200).json({ BMIdata })
    } catch (err) {
        res.status(400).json({ 'message': `unable to process`, 'error': JSON.stringify(err) })
    }
})

app.get('/bmi/:category/count', (req, res) => {
    try {
        let count = getCountByCategory(data, req.params.category)
        res.status(200).json({ count,  category : req.params.category})
    } catch (err) {
        res.status(400).json({ 'message': `unable to caclulate count`, 'error': JSON.stringify(err) })
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

let data = [{ "Gender": "Male", "HeightCm": 171, "WeightKg": 96 }, {
    "Gender": "Male", "HeightCm": 161,
    "WeightKg": 85
}, { "Gender": "Male", "HeightCm": 180, "WeightKg": 77 }, {
    "Gender": "Female",
    "HeightCm": 166, "WeightKg": 62
}, { "Gender": "Female", "HeightCm": 150, "WeightKg": 70 },
{ "Gender": "Female", "HeightCm": 167, "WeightKg": 82 }]

function formatData(data) {
    data.forEach(_ => {
        let BMI = calculateBMI(_)
        _.BMI = BMI.toFixed(2)
        _.BMICategory = getBMICategory(BMI)
        _.HealthRisk = getHealthRisk(BMI)
    })
    return data
}

function calculateBMI(weightObj) {
    return (weightObj.WeightKg * 100) / weightObj.HeightCm
}

function getBMICategory(BMI) {
    if (BMI <= 18.4) {
        return `Underweight`
    } else if (BMI >= 18.5 && BMI <= 24.9) {
        return `Normal weight`
    } else if (BMI >= 25 && BMI <= 29.9) {
        return `Overweight`
    } else if (BMI >= 30 && BMI <= 34.9) {
        return `Moderately obese`
    } else if (BMI >= 35 && BMI <= 39.9) {
        return `Severel obese`
    } else if (BMI >= 40) {
        return `Very severely obese`
    }
}

function getHealthRisk(BMI) {
    if (BMI <= 18.4) {
        return `Malnutrition risk`
    } else if (BMI >= 18.5 && BMI <= 24.9) {
        return `Low risk`
    } else if (BMI >= 25 && BMI <= 29.9) {
        return `Enhanced risk`
    } else if (BMI >= 30 && BMI <= 34.9) {
        return `Medium risk`
    } else if (BMI >= 35 && BMI <= 39.9) {
        return `High`
    } else if (BMI >= 40) {
        return `Very high risk`
    }
}

function getCountByCategory(data, category) {
    return data.filter(_ => _.BMICategory == category).length
}

module.exports = app