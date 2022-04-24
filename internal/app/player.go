package app

import (
	"fmt"
	"net/http"
	"time"

	"github.com/faiface/beep"
	"github.com/faiface/beep/mp3"
	"github.com/faiface/beep/speaker"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func (a *Application) play(audio string) error {
	// Load audio from URL
	resp, err := http.Get(audio)
	if err != nil {
		return err
	}

	// Decode audio
	streamer, format, err := mp3.Decode(resp.Body)
	if err != nil {
		return err
	}

	// Set audio streamer
	a.ctrl.Streamer = streamer
	a.ctrl.Paused = false

	// Play audio
	// TODO: do not call init every time
	speaker.Init(format.SampleRate, format.SampleRate.N(time.Second/10))
	speaker.Play(a.ctrl)

	return nil
}

func (a *Application) position() int {
	if a.ctrl.Streamer == nil {
		return 0
	}
	return a.ctrl.Streamer.(beep.StreamSeekCloser).Position() / 44100
}

func (a *Application) Pause() {
	a.ctrl.Paused = !a.ctrl.Paused
	a.updatePlayer()
}

type playerState struct {
	Paused   bool `json:"paused"`
	Position int  `json:"position"`
}

func (a *Application) UpdatePosition(pos int) {
	err := a.ctrl.Streamer.(beep.StreamSeekCloser).Seek(pos)
	if err != nil {
		fmt.Println(err)
	}
	a.updatePlayer()
}

func (a *Application) updatePlayer() {
	runtime.EventsEmit(a.ctx, "update-player", playerState{
		Paused:   a.ctrl.Paused,
		Position: a.position(),
	})
}

func (a *Application) playerUpdater() {
	for {
		a.updatePlayer()
		time.Sleep(time.Millisecond * 500)
	}
}
