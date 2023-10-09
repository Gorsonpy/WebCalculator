package service

import (
	"WebCalculator/dal/mysql"
	"WebCalculator/entity"
	"gorm.io/gorm"
)

func ExistDuration(duration float64, op int) bool {
	if op == 1 {
		result := mysql.DB.Where("duration = ?", duration).First(&entity.Deposit{})
		return result.Error != gorm.ErrRecordNotFound
	}
	result := mysql.DB.Where("duration = ?", duration).First(&entity.Loan{})
	return result.Error != gorm.ErrRecordNotFound
}

func CalInterest(cal entity.MoneyCal, op int) float64 {
	duration := cal.Duration
	money := cal.Money

	if op == 1 {
		var deposit entity.Deposit
		mysql.DB.Where("duration <= ?", duration).Order("duration desc").Limit(1).First(&deposit)
		return money * deposit.Rate / 100
	}

	var loans entity.Loan
	mysql.DB.Where("duration <= ?", duration).Order("duration desc").Limit(1).First(&loans)
	return money * loans.Rate / 100
}
