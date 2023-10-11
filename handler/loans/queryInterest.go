package loans

import (
	"WebCalculator/entity"
	"WebCalculator/service"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func QueryInterest(c *gin.Context) {
	// 获取查询参数
	principalStr := c.DefaultQuery("principal", "")
	durationStr := c.DefaultQuery("duration", "")

	// 将字符串转换为浮点数
	principal, err1 := strconv.ParseFloat(principalStr, 64)
	duration, err2 := strconv.ParseFloat(durationStr, 64)

	if err1 != nil || err2 != nil {
		// 处理转换错误，例如返回错误响应
		c.JSON(http.StatusOK, gin.H{
			"code": 400,
			"msg":  "输入无效",
		})
		return
	}

	interest := service.CalInterest(entity.MoneyCal{
		Money:    principal,
		Duration: duration,
	}, 0)
	c.JSON(http.StatusOK, gin.H{
		"code":   200,
		"msg":    "计算成功",
		"result": interest,
	})
}
