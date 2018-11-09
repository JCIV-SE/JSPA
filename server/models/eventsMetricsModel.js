'use strict';

module.exports = (sequelize, DataTypes) => {
  const AppsMetrics = sequelize.define('UserMetrics', {
    totalWeeklyEvents: DataTypes.INTEGER,
    totalDailyEvents: DataTypes.INTEGER,
    currentWeeklyEvents: DataTypes.INTEGER,
    currentDailyEvents: DataTypes.INTEGER
  });

  return AppsMetrics;
};
