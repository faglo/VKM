package app

import (
	"context"
	"fmt"
	"time"

	"github.com/faglo/vkm/internal/player"
	"github.com/faglo/vkm/internal/vkapi"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// Application struct
type Application struct {
	ctx    context.Context
	player *player.Player
}

// New creates a new Application
func New() *Application {
	return &Application{}
}

func (a *Application) Startup(ctx context.Context) {
	a.ctx = ctx
	a.player = player.New()

	go a.playerEvents()
	go func() {
		time.Sleep(time.Second * 5)

		audios, err := vkapi.NewClient(
			"a42780eec8417e41a8aaa6178237768934b271c32b8d52a54f74ffdc3db726f043b0eee4fd63ac8d49450").
			AudioByID("-2001026462_108026462_")
		if err != nil {
			fmt.Println(err)
			return
		}

		fmt.Println(a.player.Play(audios[0].URL))
	}()
}

func (a *Application) playerEvents() {
	for {
		pos := a.player.Position()
		fmt.Println(pos)
		runtime.EventsEmit(a.ctx, "player_position", pos)
		time.Sleep(time.Millisecond * 500)
	}
}
