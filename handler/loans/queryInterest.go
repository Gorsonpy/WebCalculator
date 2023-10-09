package loans

import (
	"WebCalculator/entity"
	"WebCalculator/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

func QueryInterest(c *gin.Context) {
	cal := entity.MoneyCal{}
	err := c.ShouldBindJSON(&cal)
	if err != nil {
		panic(err)
	}
	interest := service.CalInterest(cal, 0)
	c.JSON(http.StatusOK, gin.H{
		"code":   200,
		"msg":    "计算成功",
		"result": interest,
	})
}
