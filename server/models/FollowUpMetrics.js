'use strict';

module.exports = (sequelize, DataTypes) => {
  const FollowUpsMetrics = sequelize.define('FollowUpsMetrics', {
    totalWeeklyFollowUps: DataTypes.INTEGER,
    totalDailyFollowUps: DataTypes.INTEGER,
    currentWeeklyFollowUps: DataTypes.INTEGER,
    currentDailyFollowUps: DataTypes.INTEGER
  });

  return FollowUpsMetrics;
};
