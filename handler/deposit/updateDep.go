package deposit

import (
	"WebCalculator/dal/mysql"
	"WebCalculator/entity"
	"WebCalculator/service"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func UpdateDep(c *gin.Context) {
	var deposit entity.Deposit
	err := c.ShouldBindJSON(&deposit)
	fmt.Println(deposit)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	if !service.ExistDuration(deposit.Duration, 1) {
		c.JSON(http.StatusOK, gin.H{
			"code": 400,
			"msg":  "没有对应的时长",
		})
	} else {
		mysql.DB.Where("duration = ?", deposit.Duration).Updates(&deposit)
		c.JSON(http.StatusOK, gin.H{
			"code": 200,
			"msg":  "修改成功",
		})
	}
}
