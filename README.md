# Build-For-SDG-Api
This repo is hosted [here](https://on-covid.herokuapp.com/api/v1/on-covid-19/logs) 

This is part of the #BuildForSDG challenge. 

## Request struture

The API accept POST request with the body this format:

```typescript
{
        region: {
        name: "Africa",
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
        },
        periodType: "weeks",
        timeToElapse: 8,
        reportedCases: 674,
        population: 66622705,
        totalHospitalBeds: 1380614
        }
```

## Response Type
The Api return response in two format

* Json
* XML

for xml format send the request to [https://on-covid.herokuapp.com/api/v1/on-covid-19/xml](https://on-covid.herokuapp.com/api/v1/on-covid-19/xml)


## Response Structure
JSON RESPONSE
```typescript
{
    "data": {
        "region": {
            "name": "Africa",
            "avgAge": "19.7",
            "avgDailyIncomeInUSD": "5",
            "avgDailyIncomePopulation": "0.71"
        },
        "periodType": "days",
        "timeToElapse": 8,
        "reportedCases": "674",
        "population": "66622705",
        "totalHospitalBeds": "1380614",
        "null": ""
    },
    "impact": {
        "currentlyInfected": 6740,
        "infectionsByRequestedTime": 26960,
        "severeCasesByRequestedTime": 4044,
        "hospitalBedsByRequestedTime": 479170,
        "casesForICUByRequestedTime": 1348,
        "casesForVentilatorsByRequestedTime": 539,
        "dollarsInFlight": 11963
    },
    "severeImpact": {
        "currentlyInfected": 33700,
        "infectionsByRequestedTime": 134800,
        "severeCasesByRequestedTime": 20220,
        "hospitalBedsByRequestedTime": 462994,
        "casesForICUByRequestedTime": 6740,
        "casesForVentilatorsByRequestedTime": 2696,
        "dollarsInFlight": 59817
    }
}
```

XML RESPONSE
```typescript
<estimate>
    <data>
        <region>
            <name>Africa</name>
            <avgAge>19.7</avgAge>
            <avgDailyIncomeInUSD>5</avgDailyIncomeInUSD>
            <avgDailyIncomePopulation>0.71</avgDailyIncomePopulation>
        </region>
        <periodType>days</periodType>
        <timeToElapse>8</timeToElapse>
        <reportedCases>674</reportedCases>
        <population>66622705</population>
        <totalHospitalBeds>1380614</totalHospitalBeds>
        <null/>
    </data>
    <impact>
        <currentlyInfected>6740</currentlyInfected>
        <infectionsByRequestedTime>26960</infectionsByRequestedTime>
        <severeCasesByRequestedTime>4044</severeCasesByRequestedTime>
        <hospitalBedsByRequestedTime>479170</hospitalBedsByRequestedTime>
        <casesForICUByRequestedTime>1348</casesForICUByRequestedTime>
        <casesForVentilatorsByRequestedTime>539</casesForVentilatorsByRequestedTime>
        <dollarsInFlight>11963</dollarsInFlight>
    </impact>
    <severeImpact>
        <currentlyInfected>33700</currentlyInfected>
        <infectionsByRequestedTime>134800</infectionsByRequestedTime>
        <severeCasesByRequestedTime>20220</severeCasesByRequestedTime>
        <hospitalBedsByRequestedTime>462994</hospitalBedsByRequestedTime>
        <casesForICUByRequestedTime>6740</casesForICUByRequestedTime>
        <casesForVentilatorsByRequestedTime>2696</casesForVentilatorsByRequestedTime>
        <dollarsInFlight>59817</dollarsInFlight>
    </severeImpact>
</estimate>
```


