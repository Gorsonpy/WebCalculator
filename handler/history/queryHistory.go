package history

import (
	"WebCalculator/entity"
	"WebCalculator/service"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func QueryHistory(c *gin.Context) {
	var histories []*entity.History
	// mysql.DB.Order("created_at desc").Limit(10).Find(&histories)
	histories = service.GetLast10()
	fmt.Printf("histories: %+v\n", histories)
	c.JSON(http.StatusOK, gin.H{
		"code":   200,
		"msg":    "查询成功",
		"result": histories,
	})
}
