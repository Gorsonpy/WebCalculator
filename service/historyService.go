package service

import (
	"WebCalculator/dal/mysql"
	"WebCalculator/entity"
	"fmt"
)

func GetLast10() []*entity.History {
	var resp = make([]*entity.History, 0)
	err := mysql.DB.
		Model(&entity.History{}).
		Order("created_at desc").Limit(10).Find(&resp).Error
	if err != nil {
		fmt.Printf("db error: %+v\n", err)
	}

	return resp
}
