package player

import (
	"net/http"
	"time"

	"github.com/faiface/beep"
	"github.com/faiface/beep/mp3"
	"github.com/faiface/beep/speaker"
)

// Player represents an audio player
type Player struct {
	ctrl *beep.Ctrl
}

// New creates a new Player
func New() *Player {
	return &Player{&beep.Ctrl{}}
}

// Play plays audio from URL
func (p *Player) Play(audio string) error {
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
	defer streamer.Close()

	// Set audio streamer
	p.ctrl.Streamer = streamer
	p.ctrl.Paused = false

	// Play audio
	// TODO: do not call init every time
	speaker.Init(format.SampleRate, format.SampleRate.N(time.Second/10))
	speaker.Play(p.ctrl)

	return nil
}

// Pause pauses audio
func (p *Player) Pause() {
	p.ctrl.Paused = true
}

// Resume resumes audio
func (p *Player) Resume() {
	p.ctrl.Paused = false
}

// Position returns current position
func (p *Player) Position() int {
	if p.ctrl.Streamer == nil {
		return 0
	}
	return p.ctrl.Streamer.(beep.StreamSeekCloser).Position()
}
