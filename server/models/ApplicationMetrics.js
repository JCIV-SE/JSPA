'use strict';

module.exports = (sequelize, DataTypes) => {
  const AppsMetrics = sequelize.define('UserMetrics', {
    goalOverallApps: DataTypes.INTEGER,
    goalMonthlyApps: DataTypes.INTEGER,
    goalWeeklyApps: DataTypes.INTEGER,
    goalDailyApps: DataTypes.INTEGER,
    totalHistoryApps: DataTypes.INTEGER,
    totalMonthlyApps: DataTypes.INTEGER,
    totalWeeklyApps: DataTypes.INTEGER,
    totalDailyApps: DataTypes.INTEGER,
    currentWeeklyApps: DataTypes.INTEGER,
    currentDailyApps: DataTypes.INTEGER
  });

  return AppsMetrics;
};
