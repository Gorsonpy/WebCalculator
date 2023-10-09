package deposit

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
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	interest := service.CalInterest(cal, 1)
	c.JSON(http.StatusOK, gin.H{
		"code":   200,
		"msg":    "计算成功",
		"result": interest,
	})

}
