package main

import (
	"WebCalculator/dal/mysql"
	"WebCalculator/router"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	mysql.Init()
	r := gin.Default()
	// 解决跨域问题
	r.Use(cors.Default())
	router.SetUpRoutes(r)
	err := r.Run(":8080")
	if err != nil {
		panic(err)
	}
}
