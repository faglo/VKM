package app

import (
	"context"

	"github.com/faglo/vkm/internal/vkapi"
	"github.com/faiface/beep"
)

// Application struct
type Application struct {
	ctx  context.Context
	api  *vkapi.Client
	ctrl *beep.Ctrl
}

// New creates a new Application
func New() *Application {
	return &Application{
		api:  vkapi.New("a42780eec8417e41a8aaa6178237768934b271c32b8d52a54f74ffdc3db726f043b0eee4fd63ac8d49450"),
		ctrl: &beep.Ctrl{},
	}
}

func (a *Application) Startup(ctx context.Context) {
	a.ctx = ctx
	go a.playerUpdater()
}
