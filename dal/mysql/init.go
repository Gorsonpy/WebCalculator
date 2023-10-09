package mysql

import (
	"WebCalculator/entity"
	"WebCalculator/pkg/constants"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func Init() {
	var err error
	DB, err = gorm.Open(mysql.Open(constants.MySQLDSN), &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
		Logger:                 logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		panic(err)
	}

	err = DB.AutoMigrate(&entity.History{}, &entity.Deposit{}, &entity.Loan{})
	if err != nil {
		return
	}
}
