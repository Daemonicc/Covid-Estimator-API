const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  const beds = (0.35 * data.totalHospitalBeds);
  const income = data.region.avgDailyIncomeInUSD;
  const population = data.region.avgDailyIncomePopulation;

  // Normalize timeToElapse to days
  if (data.periodType === 'weeks') {
    data.timeToElapse *= 7;
  } else if (data.periodType === 'months') {
    data.timeToElapse *= 30;
  } else {
    data.timeToElapse *= 1;
  }

  const days = data.timeToElapse;
  const factor = 2 ** (Math.floor(days / 3));

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  impact.infectionsByRequestedTime = impact.currentlyInfected * factor;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * factor;

  impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;

  const severecases = severeImpact.severeCasesByRequestedTime;
  const impactInfections = impact.infectionsByRequestedTime;
  const severeInfections = severeImpact.infectionsByRequestedTime;
  const impactEconomy = impactInfections * income * population;
  const severeEconomy = severeInfections * income * population;

  impact.hospitalBedsByRequestedTime = Math.trunc(beds - impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(beds - severecases);

  impact.casesForICUByRequestedTime = Math.trunc(0.05 * impactInfections);
  severeImpact.casesForICUByRequestedTime = Math.trunc(0.05 * severeInfections);

  impact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * impactInfections);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * severeInfections);

  impact.dollarsInFlight = Math.trunc(impactEconomy / days);
  severeImpact.dollarsInFlight = Math.trunc((severeEconomy / days));

  return {
    data,
    impact,
    severeImpact
  };
};

module.exports = covid19ImpactEstimator;
