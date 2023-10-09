package history

import (
	"WebCalculator/dal/mysql"
	"WebCalculator/entity"
	"github.com/gin-gonic/gin"
	"net/http"
)

func QueryHistory(c *gin.Context) {
	var histories [10]entity.History
	mysql.DB.Order("created_at desc").Limit(10).Find(&histories)
	// service.GetLast10(histories)
	c.JSON(http.StatusOK, gin.H{
		"code":   200,
		"msg":    "查询成功",
		"result": histories,
	})
}
