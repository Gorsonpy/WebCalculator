package router

import (
	"WebCalculator/handler/deposit"
	"WebCalculator/handler/hello"
	"WebCalculator/handler/history"
	"WebCalculator/handler/loans"
	"github.com/gin-gonic/gin"
)

func SetUpRoutes(engine *gin.Engine) {
	home := engine.Group("/")
	{
		home.GET("/hello", hello.Hello)
	}
	his := engine.Group("/history")
	{
		his.POST("/", history.AddHistory)
		his.GET("/", history.QueryHistory)
	}
	dep := engine.Group("/deposit")
	{
		dep.POST("/", deposit.UpdateDep)
		dep.GET("/", deposit.QueryInterest)
	}
	l := engine.Group("/loans")
	{
		l.GET("/", loans.QueryInterest)
		l.POST("/", loans.UpdateLoans)
	}
}
